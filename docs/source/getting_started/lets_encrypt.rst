Let's Encrypt & SSL/TLS Setup
==============================

Overview
--------

Secure HTTPS access is required for ictVoIP Billing, WHMCS, and the
FusionPBX APIs. This guide provides a high-level overview of setting up
and maintaining SSL/TLS certificates using Let's Encrypt, with a focus
on FusionPBX wildcard certificates for tenant domains.

The examples below are provided as a reference pattern. Always adjust
hostnames, paths, and service names to match your own environment.

General Requirements
--------------------

Before configuring SSL/TLS, ensure you have:

* A fully qualified domain name (FQDN) for your FusionPBX host
  (for example, ``pbx.yourdomain.com``).
* DNS under your control (for example, via your DNS provider or
  Cloudflare).
* Shell/SSH access to the FusionPBX server.
* The ability to install and run Let's Encrypt tooling (such as
  ``dehydrated`` or the FusionPBX installer scripts).

FusionPBX Wildcard SSL (Example Workflow)
-----------------------------------------

.. container:: section pt-100 pb-100 ssl-doc-section

   .. container::

      .. container:: doc-content ssl-doc-production

         .. container:: alert-box alert-info

            **Admin use:** Use this guide to set up automated wildcard
            SSL certificate renewal on FusionPBX servers using Let's
            Encrypt with Cloudflare DNS-01 validation.

         .. rubric:: Table of Contents
            :name: table-of-contents

         - `Overview <#overview>`__
         - `Prerequisites <#prerequisites>`__
         - `Method 1: Automated Cloudflare DNS-01 <#method1>`__
         - `Method 2: Manual DNS-01 (FusionPBX Helper
           Script) <#method2>`__
         - `Troubleshooting <#troubleshooting>`__
         - `Quick Reference <#reference>`__

         .. rubric:: Overview
            :name: overview

         This guide provides step-by-step instructions for setting up
         **automated wildcard SSL certificate renewal** on FusionPBX and
         FS PBX servers using Let's Encrypt with Cloudflare DNS-01
         challenge.

         .. container:: card

            .. container:: card-header

               Two Methods Available

            This guide covers two approaches for wildcard SSL
            certificates:

            - **Method 1: Automated Cloudflare DNS-01** - Fully
              automated renewal using Cloudflare API (recommended for
              Cloudflare users)
            - **Method 2: Manual DNS-01 (FusionPBX Helper Script)** -
              Manual DNS TXT record addition using FusionPBX's built-in
              helper script

         .. container:: alert-box alert-warning

            **FS PBX Important Note:** The FS PBX artisan command
            (``php artisan app:install-lets-encrypt-certificate``) only
            supports single-domain certificates via HTTP-01 challenge.
            It **cannot** generate wildcard certificates. For wildcard
            SSL on FS PBX, you must use the manual dehydrated +
            Cloudflare DNS-01 method (Method 1) described in this guide.

         .. container:: card

            .. container:: card-header

               Why Wildcard Certificates?

            Wildcard certificates (e.g., ``*.pbx.example.com``) allow
            you to secure all subdomains under a single certificate.
            This is ideal for multi-tenant FusionPBX/FS PBX deployments
            where tenant domains are created dynamically.

         .. container:: card

            .. container:: card-header

               Why DNS-01 Challenge?

            - **HTTP-01 challenge** (default) cannot validate wildcard
              domains
            - **DNS-01 challenge** validates domain ownership via DNS
              TXT records
            - With Cloudflare API integration, DNS-01 can be **fully
              automated**

         .. rubric:: Prerequisites
            :name: prerequisites

         ================== =============================
         Requirement        Details
         ================== =============================
         FusionPBX / FS PBX dehydrated installed
         DNS Provider       Cloudflare with API access
         Operating System   Debian 11/12 or Ubuntu 20.04+
         Packages           ``curl``, ``jq``
         ================== =============================

         .. rubric:: Method 1: Automated Cloudflare DNS-01
            :name: method1

         .. container:: alert-box alert-info

            **Recommended for:** Cloudflare DNS users who want fully
            automated certificate renewal without manual intervention.

         .. rubric:: Step 1: Create Cloudflare API Token
            :name: step1

         .. rubric:: 1.1 Access Cloudflare Dashboard
            :name: access-cloudflare-dashboard

         #. Log in to Cloudflare Dashboard.
         #. Click your profile icon and open **My Profile**.
         #. Select **API Tokens** from the left sidebar.

         .. rubric:: 1.2 Create Token
            :name: create-token

         #. Click **Create Token**.
         #. Select **Use template** next to "Edit zone DNS".
         #. Configure permissions:

         ============== ================================================
         Setting        Value
         ============== ================================================
         Token name     FusionPBX SSL Renewal - ``[servername]``
         Permissions    Zone ??? DNS ??? Edit
         Zone Resources Include ??? Specific zone ??? ``yourdomain.com``
         TTL            Optional expiration or unlimited
         ============== ================================================

         Click **Continue to summary** and then **Create Token**. Copy
         the token immediately because it will not be shown again.

         .. rubric:: 1.3 Verify Token
            :name: verify-token

         Test the token from your FusionPBX server:

         .. code:: bash

            curl "https://api.cloudflare.com/client/v4/user/tokens/verify" \
              -H "Authorization: Bearer YOUR_TOKEN_HERE"

         Expected response:

         .. container:: alert-box alert-success

            **Expected response:**
            ``{"success":true,"messages":[{"message":"This API Token is valid and active"}]}``

         .. rubric:: Step 2: Install Dependencies
            :name: step2

         SSH into your FusionPBX server as root:

         .. code:: bash

            apt-get update && apt-get install -y jq curl

         .. rubric:: Step 3: Create Cloudflare Credentials File
            :name: step3

         .. code:: bash

            cat > /etc/dehydrated/cloudflare.env << 'EOF'
            # Cloudflare API Token for DNS-01 challenge
            CF_TOKEN="YOUR_CLOUDFLARE_API_TOKEN_HERE"
            EOF

            chmod 600 /etc/dehydrated/cloudflare.env

         .. container:: alert-box alert-warning

            **Important:** Replace ``YOUR_CLOUDFLARE_API_TOKEN_HERE``
            with your actual Cloudflare API token.

         .. rubric:: Step 4: Create Cloudflare DNS Hook Script
            :name: step4

         Create the hook directory:

         .. code:: bash

            mkdir -p /etc/dehydrated/hooks

         Create ``/etc/dehydrated/hooks/cloudflare.sh``:

         .. code:: bash

            cat > /etc/dehydrated/hooks/cloudflare.sh << 'HOOKEOF'
            #!/usr/bin/env bash

            source /etc/dehydrated/cloudflare.env

            deploy_challenge() {
                local DOMAIN="${1}" TOKEN_FILENAME="${2}" TOKEN_VALUE="${3}"
                local BASE_DOMAIN=$(echo "$DOMAIN" | sed 's/^\*\.//' | rev | cut -d. -f1-2 | rev)

                echo "[Cloudflare Hook] Looking up zone for: ${BASE_DOMAIN}"

                local ZONE_RESPONSE=$(curl -s -X GET \
                    "https://api.cloudflare.com/client/v4/zones?name=${BASE_DOMAIN}" \
                    -H "Authorization: Bearer ${CF_TOKEN}" \
                    -H "Content-Type: application/json")

                local ZONE_ID=$(echo "$ZONE_RESPONSE" | jq -r '.result[0].id')

                if [[ "$ZONE_ID" == "null" ]] || [[ -z "$ZONE_ID" ]]; then
                    echo "[Cloudflare Hook] ERROR: Could not find zone for ${BASE_DOMAIN}"
                    return 1
                fi

                local RECORD_NAME="_acme-challenge.${DOMAIN}"
                RECORD_NAME=$(echo "$RECORD_NAME" | sed 's/\*\.//')

                local RESULT=$(curl -s -X POST \
                    "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
                    -H "Authorization: Bearer ${CF_TOKEN}" \
                    -H "Content-Type: application/json" \
                    --data "{\"type\":\"TXT\",\"name\":\"${RECORD_NAME}\",\"content\":\"${TOKEN_VALUE}\",\"ttl\":120}")

                local SUCCESS=$(echo "$RESULT" | jq -r '.success')

                if [[ "$SUCCESS" == "true" ]]; then
                    echo "[Cloudflare Hook] TXT record created successfully"
                    echo "[Cloudflare Hook] Waiting 30 seconds for DNS propagation..."
                    sleep 30
                else
                    echo "[Cloudflare Hook] ERROR creating TXT record: $RESULT"
                    return 1
                fi
            }

            clean_challenge() {
                local DOMAIN="${1}" TOKEN_FILENAME="${2}" TOKEN_VALUE="${3}"
                local BASE_DOMAIN=$(echo "$DOMAIN" | sed 's/^\*\.//' | rev | cut -d. -f1-2 | rev)

                local ZONE_ID=$(curl -s -X GET \
                    "https://api.cloudflare.com/client/v4/zones?name=${BASE_DOMAIN}" \
                    -H "Authorization: Bearer ${CF_TOKEN}" \
                    -H "Content-Type: application/json" | jq -r '.result[0].id')

                [[ "$ZONE_ID" == "null" ]] || [[ -z "$ZONE_ID" ]] && return 0

                local RECORD_NAME="_acme-challenge.${DOMAIN}"
                RECORD_NAME=$(echo "$RECORD_NAME" | sed 's/\*\.//')

                local RECORD_ID=$(curl -s -X GET \
                    "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records?type=TXT&name=${RECORD_NAME}" \
                    -H "Authorization: Bearer ${CF_TOKEN}" \
                    -H "Content-Type: application/json" | jq -r ".result[] | select(.content==\"${TOKEN_VALUE}\") | .id")

                if [[ -n "$RECORD_ID" ]] && [[ "$RECORD_ID" != "null" ]]; then
                    curl -s -X DELETE \
                        "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records/${RECORD_ID}" \
                        -H "Authorization: Bearer ${CF_TOKEN}" \
                        -H "Content-Type: application/json" > /dev/null
                    echo "[Cloudflare Hook] TXT record deleted"
                fi
            }

            deploy_cert() {
                local DOMAIN="${1}"
                echo "[Cloudflare Hook] Certificate deployed for ${DOMAIN}"
                systemctl reload nginx 2>/dev/null && echo "[Cloudflare Hook] nginx reloaded" || true
                systemctl restart freeswitch 2>/dev/null && echo "[Cloudflare Hook] freeswitch restarted" || true
            }

            unchanged_cert() {
                local DOMAIN="${1}"
                echo "[Cloudflare Hook] Certificate for ${DOMAIN} is still valid, skipping renewal"
            }

            HANDLER="$1"; shift
            if [[ "${HANDLER}" =~ ^(deploy_challenge|clean_challenge|deploy_cert|unchanged_cert)$ ]]; then
                "$HANDLER" "$@"
            fi
            HOOKEOF

            chmod +x /etc/dehydrated/hooks/cloudflare.sh

         .. rubric:: Step 5: Configure Dehydrated for DNS-01
            :name: step5

         Add the following to ``/etc/dehydrated/config``:

         .. code:: bash

            cat >> /etc/dehydrated/config << 'EOF'

            # ===== Cloudflare DNS-01 Configuration for Wildcard Certs =====
            CHALLENGETYPE="dns-01"
            HOOK="/etc/dehydrated/hooks/cloudflare.sh"
            EOF

         .. rubric:: Verify Configuration
            :name: verify-configuration

         .. code:: bash

            grep -E "^(CHALLENGETYPE|HOOK)=" /etc/dehydrated/config

         .. container:: alert-box alert-info

            **Expected output:**
            ``CHALLENGETYPE="dns-01"``
            ``HOOK="/etc/dehydrated/hooks/cloudflare.sh"``

         .. rubric:: Step 6: Configure Domains
            :name: step6

         Edit ``/etc/dehydrated/domains.txt``:

         .. rubric:: Domain Format
            :name: domain-format

         .. code:: text

            *.pbx.example.com > pbx.example.com

         This requests a wildcard certificate for ``*.pbx.example.com``
         and stores it in a directory named ``pbx.example.com``.

         .. rubric:: FS PBX Dual Certificate Setup
            :name: fs-pbx-dual-certificate-setup

         For FS PBX servers with a main host (e.g., ``pbx.example.com``)
         and wildcard tenant subdomains (e.g.,
         ``*.tenant.example.com``), you need **two separate
         certificates**:

         .. code:: text

            *.tenant.example.com > tenant.example.com
            pbx.example.com > pbx.example.com

         .. container:: alert-box alert-info

            **FS PBX Main Host:** Use the FS PBX artisan command for the
            main host certificate
            (``php artisan app:install-lets-encrypt-certificate``). Use
            this guide only for the wildcard certificate for tenant
            subdomains.

         .. rubric:: Example
            :name: example

         For a FusionPBX server at ``pbx.example.com`` with tenant
         subdomains:

         .. code:: text

            *.pbx.example.com > pbx.example.com

         .. rubric:: Step 7: Configure FS PBX for Wildcard SSL (FS PBX
            Only)
            :name: step7

         .. container:: alert-box alert-warning

            **FS PBX Only:** This step is required for FS PBX servers.
            FusionPBX users can skip to Step 8.

         For FS PBX with a main host and wildcard tenant subdomains,
         follow these substeps in order:

         .. rubric:: 7.1 Configure FS PBX Environment (Before
            Certificate Installation)
            :name: configure-fs-pbx-environment-before-certificate-installation

         Before installing any certificates, configure the FS PBX
         ``.env`` file for wildcard session support:

         .. code:: bash

            cd /var/www/fspbx
            nano .env

         Update these settings:

         .. code:: env

            APP_URL=https://pbx.example.com
            SESSION_DOMAIN=.tenant.example.com
            SANCTUM_STATEFUL_DOMAINS=pbx.example.com,*.tenant.example.com

         Then clear the config cache:

         .. code:: bash

            php artisan config:cache

         .. container:: alert-box alert-info

            **Important:** Replace ``pbx.example.com`` with your main
            host domain and ``tenant.example.com`` with your wildcard
            base domain. The ``SESSION_DOMAIN`` should have a leading
            dot (e.g., ``.tenant.example.com``) to work across all
            subdomains.

         .. rubric:: 7.2 Install Main Host Certificate (FS PBX Artisan)
            :name: install-main-host-certificate-fs-pbx-artisan

         Now install the main host certificate using the FS PBX artisan
         command:

         .. code:: bash

            cd /var/www/fspbx
            php artisan app:install-lets-encrypt-certificate

         Enter your main host domain (e.g., ``pbx.example.com``). This
         configures nginx automatically for the main host.

         .. rubric:: 7.3 Generate Wildcard Certificate
            :name: generate-wildcard-certificate

         .. container:: alert-box alert-info

            **FS PBX Note:** On FS PBX systems, dehydrated is installed
            at ``/usr/bin/dehydrated`` rather than
            ``/usr/local/sbin/dehydrated``. Create a symlink before
            running the test:
            ::

               ln -s /usr/bin/dehydrated /usr/local/sbin/dehydrated

         Now generate the wildcard certificate:

         .. code:: bash

            /usr/local/sbin/dehydrated -c --force

         .. rubric:: Expected Output
            :name: expected-output

         Expected flow:

         - Finds the Cloudflare zone.
         - Creates ``_acme-challenge`` TXT record.
         - Waits for DNS propagation.
         - Validates the challenge.
         - Removes the TXT record.
         - Creates ``fullchain.pem`` for both main host and wildcard
           domains.
         - Reloads nginx and restarts FreeSWITCH.

         .. rubric:: 7.4 Configure Wildcard Nginx Server Block
            :name: configure-wildcard-nginx-server-block

         .. container:: alert-box alert-warning

            **Critical:** This step must be done AFTER both certificates
            are generated (steps 7.2 and 7.3). The artisan command in
            7.2 sets up nginx for the main host, and now we add the
            wildcard configuration alongside it.

         Create a separate nginx server block for wildcard subdomains.
         This configuration mirrors the main ``fspbx.conf`` but uses the
         wildcard certificate:

         .. container:: alert-box alert-warning

            **Important:** Check your PHP-FPM version first by running
            ``ls /var/run/php/`` to find the correct socket path (e.g.,
            ``php8.4-fpm.sock``). Update the ``fastcgi_pass`` lines
            below with your actual PHP version.

         .. code:: bash

            cat > /etc/nginx/sites-available/wildcard-tenant.conf << 'EOF'
            server {
                listen 80;
                server_name *.tenant.example.com;
                root /var/www/fspbx/public;

                access_log /var/log/nginx/access.log;
                error_log /var/log/nginx/error.log;

                add_header X-Frame-Options "SAMEORIGIN";
                add_header X-Content-Type-Options "nosniff";

                index index.php;
                charset utf-8;

                location / {
                    try_files $uri $uri/ /index.php?$query_string;
                }

                location = /favicon.ico { access_log off; log_not_found off; }
                location = /robots.txt  { access_log off; log_not_found off; }

                error_page 404 /index.php;

                location ^~ /.well-known/acme-challenge {
                    default_type "text/plain";
                    auth_basic "off";
                    alias /var/www/dehydrated;
                }

                location = /logout.php {
                    rewrite ^.*/logout.php?$ https://$host/logout permanent;
                }

                location = /login.php {
                    rewrite ^.*/login.php?$ https://$host/login permanent;
                }

                if ($args ~* "/?domain_uuid=([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})&domain_change=true") {
                    rewrite ^ https://$host/domains/switch/$arg_domain_uuid? last;
                }

                location /core/domains/domain_json.php {
                    rewrite ^ https://$host/domains/filter/?$args  permanent;
                }

                client_max_body_size 80M;
                client_body_buffer_size 128k;

                location ~ \.php$ {
                    fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
                    fastcgi_index index.php;
                    include fastcgi_params;
                    fastcgi_param SCRIPT_FILENAME /var/www/fspbx/public$fastcgi_script_name;
                }

                location = /core/upgrade/index.php {
                    fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
                    fastcgi_index index.php;
                    include fastcgi_params;
                    fastcgi_param SCRIPT_FILENAME /var/www/fspbx/public$fastcgi_script_name;
                    fastcgi_read_timeout 15m;
                }

                location ~ .htaccess { deny all; }
                location ~ .htpassword { deny all; }
                location ~^.+.(db)$ { deny all; }
                location ~ /\.git { deny all; }
                location ~ /\.lua { deny all; }
                location ~ /\. { deny all; }
            }

            server {
                listen 443 ssl;
                server_name *.tenant.example.com;
                root /var/www/fspbx/public;

                access_log /var/log/nginx/access.log;
                error_log /var/log/nginx/error.log;

                include snippets/fspbx-reverb.conf;

                ssl_certificate /etc/dehydrated/certs/tenant.example.com/fullchain.pem;
                ssl_certificate_key /etc/dehydrated/certs/tenant.example.com/privkey.pem;
                ssl_protocols TLSv1.2 TLSv1.3;
                ssl_ciphers HIGH:!ADH:!MD5:!aNULL;

                add_header X-Frame-Options "SAMEORIGIN";
                add_header X-Content-Type-Options "nosniff";
                add_header Accept-Ranges bytes;

                index index.php;
                charset utf-8;

                location / {
                    try_files $uri $uri/ /index.php?$query_string;
                }

                location = /favicon.ico { access_log off; log_not_found off; }
                location = /robots.txt  { access_log off; log_not_found off; }

                error_page 404 /index.php;

                location ^~ /.well-known/acme-challenge {
                    default_type "text/plain";
                    auth_basic "off";
                    alias /var/www/dehydrated;
                }

                location = /logout.php {
                    rewrite ^.*/logout.php?$ https://$host/logout permanent;
                }

                location = /login.php {
                    rewrite ^.*/login.php?$ https://$host/login permanent;
                }

                if ($args ~* "/?domain_uuid=([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})&domain_change=true") {
                    rewrite ^ https://$host/domains/switch/$arg_domain_uuid? last;
                }

                location = /core/domains/domain_json.php {
                    rewrite ^ https://$host/domains/filter/?$args  permanent;
                }

                location = /app/call_center_active/call_center_queue.php {
                    rewrite ^ https://$host/contact-center  permanent;
                }

                location ~* ^/app/call_center_active/call_center_active.php {
                    return 301 https://$host/contact-center;
                }

                client_max_body_size 80M;
                client_body_buffer_size 128k;

                location ~ \.php$ {
                    fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
                    fastcgi_index index.php;
                    include fastcgi_params;
                    fastcgi_param SCRIPT_FILENAME /var/www/fspbx/public$fastcgi_script_name;
                }

                location = /core/upgrade/index.php {
                    fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
                    fastcgi_index index.php;
                    include fastcgi_params;
                    fastcgi_param SCRIPT_FILENAME /var/www/fspbx/public$fastcgi_script_name;
                    fastcgi_read_timeout 15m;
                }

                location ~ .htaccess { deny all; }
                location ~ .htpassword { deny all; }
                location ~ /\.git { deny all; }
                location ~ /\.lua { deny all; }
                location ~ /\. { deny all; }
            }
            EOF

            ln -s /etc/nginx/sites-available/wildcard-tenant.conf /etc/nginx/sites-enabled/
            nginx -t
            nginx -s reload

         .. container:: alert-box alert-info

            **Important Notes:**

            - Replace ``*.tenant.example.com`` and
              ``tenant.example.com`` with your actual wildcard domain
            - Update ``php8.4-fpm.sock`` to match your PHP version
              (check with ``ls /var/run/php/``)
            - The ``include snippets/fspbx-reverb.conf;`` line enables
              WebSocket support for FS PBX features
            - This configuration mirrors the main ``fspbx.conf`` but
              uses the wildcard SSL certificate

         .. rubric:: Step 8: Verify Automatic Renewal (Cron)
            :name: step8

         FusionPBX and FS PBX typically install a cron job for
         dehydrated. Verify it exists:

         .. code:: bash

            cat /etc/cron.d/dehydrated 2>/dev/null || crontab -l | grep dehydrated

         **Expected output:**

         ::

            # Dehydrated SSL certificate renewal
            0 3 * * * root /usr/local/sbin/dehydrated -c >> /var/log/dehydrated.log 2>&1

         This cron job runs daily at 3:00 AM and automatically renews
         certificates when they're within 30 days of expiration.

         If no cron exists, create one:

         .. code:: bash

            cat > /etc/cron.d/dehydrated << 'EOF'
            # Dehydrated SSL certificate renewal
            0 3 * * * root /usr/local/sbin/dehydrated -c >> /var/log/dehydrated.log 2>&1
            EOF

         .. container:: alert-box alert-success

            **Setup Complete!** Your wildcard SSL certificates are now
            configured and will automatically renew. Both your main host
            and wildcard tenant subdomains should show secure HTTPS
            connections.

         .. rubric:: Method 2: Manual DNS-01 (FusionPBX Helper Script)
            :name: method2

         .. container:: alert-box alert-info

            **Recommended for:** FusionPBX users who prefer using the
            built-in helper script and are comfortable manually adding
            DNS TXT records for each renewal.

         .. container:: alert-box alert-warning

            **FS PBX Note:** This method is for FusionPBX only. FS PBX
            does not have a built-in wildcard SSL helper script. Use
            Method 1 for FS PBX.

         .. rubric:: Step 1: Run the FusionPBX Let's Encrypt Helper
            Script
            :name: fusionpbx-step1

         Recent FusionPBX installations include a helper script that
         integrates with dehydrated to issue certificates, including
         wildcard certificates via DNS-01 challenges.

         .. code:: bash

            # Navigate to the FusionPBX scripts directory
            cd /var/www/fusionpbx/resources/pki/scripts

            # Run the Let's Encrypt helper script
            ./letsencrypt.sh

         .. rubric:: Step 2: Provide Domain and Email
            :name: fusionpbx-step2

         When prompted, provide:

         - **Wildcard domain**: e.g., ``*.pbx.example.com``
         - **Contact email**: For Let's Encrypt notifications

         .. rubric:: Step 3: Complete the DNS-01 Challenge
            :name: fusionpbx-step3

         The script will display the exact TXT record value that must be
         added to your DNS provider:

         #. **Add the TXT record** in your DNS provider interface:

            - Name: ``_acme-challenge.pbx.example.com``
            - Value: The token displayed by the script

         #. **Wait for DNS propagation** (typically 30-60 seconds):

            .. code:: bash

               dig _acme-challenge.pbx.example.com TXT

         #. **Return to the script** and press Enter to continue when
            the record is visible.

         .. rubric:: Step 4: Certificate Issuance and Storage
            :name: fusionpbx-step4

         Once the challenge is validated, the script will:

         - Request the wildcard certificate from Let's Encrypt
         - Write certificate files (``fullchain.pem``, ``privkey.pem``)
           to the dehydrated certificate directory
         - Update the web server (nginx) FusionPBX virtual host to use
           the new certificate
         - Update FreeSWITCH TLS configuration for SIP/WebRTC

         The certificate path is typically:

         .. code:: text

            /etc/dehydrated/certs/pbx.example.com/

         .. rubric:: Step 5: Configure Tenant Subdomains
            :name: fusionpbx-step5

         For tenant-specific subdomains (e.g.,
         ``tenant1.pbx.example.com``), configure additional HTTPS
         virtual hosts in nginx:

         .. code:: nginx

            server {
                listen 443 ssl http2;
                server_name tenant1.pbx.example.com;
                root /var/www/fusionpbx;

                ssl_certificate /etc/dehydrated/certs/pbx.example.com/fullchain.pem;
                ssl_certificate_key /etc/dehydrated/certs/pbx.example.com/privkey.pem;
                ssl_protocols TLSv1.2 TLSv1.3;

                # Include standard FusionPBX location blocks
                include /etc/fusionpbx/nginx_location.conf;
            }

         Ensure DNS A/AAAA records for each tenant subdomain point to
         the FusionPBX server.

         .. rubric:: Step 6: Manual Renewal
            :name: fusionpbx-step6

         When the certificate expires (every 90 days), repeat the
         process:

         #. Run the helper script again
         #. Update the DNS TXT record with the new token
         #. Wait for propagation
         #. Complete the challenge

         .. container:: alert-box alert-warning

            **Important:** Unlike Method 1, this method requires manual
            intervention for each renewal. Consider using Method 1
            (Cloudflare automation) for hands-off renewal.

         .. rubric:: Troubleshooting
            :name: troubleshooting

         .. rubric:: Issue: Could not find zone
            :name: issue-could-not-find-zone

         Cause: API token does not have access to the zone, or the zone
         name is incorrect.

         Solution:

         .. code:: bash

            source /etc/dehydrated/cloudflare.env
            curl -s "https://api.cloudflare.com/client/v4/zones?name=example.com" \
              -H "Authorization: Bearer ${CF_TOKEN}" | jq .

         .. rubric:: Issue: ERROR creating TXT record
            :name: issue-error-creating-txt-record

         Cause: token lacks DNS edit permission or a stale
         ``_acme-challenge`` TXT record exists.

         Solution:

         #. Confirm the token has Zone ??? DNS ??? Edit permission.
         #. Check Cloudflare for stale ``_acme-challenge`` TXT records.
         #. Delete stale challenge records if needed.

         .. rubric:: Issue: Certificate not used after renewal
            :name: issue-certificate-not-used-after-renewal

         Reload services:

         .. code:: bash

            systemctl reload nginx
            systemctl restart freeswitch

         .. rubric:: Issue: Main host certificate broken after wildcard
            setup (FS PBX)
            :name: issue-main-host-certificate-broken-after-wildcard-setup-fs-pbx

         Cause: nginx wildcard server block
         (``server_name *.tenant.example.com``) matches the main host as
         a subdomain.

         Solution: Ensure the main host has a dedicated server block
         that comes before the wildcard block in nginx configuration.
         The FS PBX artisan command should create this automatically.
         Verify:

         .. code:: bash

            grep -n "server_name" /etc/nginx/sites-available/fspbx.conf

         The main host server block should appear first in the file or
         be in a separate config file that loads alphabetically before
         the wildcard config.

         .. rubric:: Issue: DNS propagation timeout
            :name: issue-dns-propagation-timeout

         Increase the wait in ``deploy_challenge`` from ``sleep 30`` to
         ``sleep 60``.

         .. rubric:: File Locations Summary
            :name: file-locations-summary

         ======================================= =============================
         File                                    Purpose
         ======================================= =============================
         ``/etc/dehydrated/config``              Main dehydrated configuration
         ``/etc/dehydrated/domains.txt``         List of domains to manage
         ``/etc/dehydrated/cloudflare.env``      Cloudflare API credentials
         ``/etc/dehydrated/hooks/cloudflare.sh`` DNS-01 challenge hook script
         ``/etc/dehydrated/certs/``              Generated certificates
         ``/var/log/dehydrated.log``             Renewal log
         ======================================= =============================

         .. rubric:: Quick Reference
            :name: reference

         .. rubric:: Initial Setup Commands
            :name: initial-setup-commands

         .. code:: bash

            apt-get update && apt-get install -y jq curl

            cat > /etc/dehydrated/cloudflare.env << 'EOF'
            CF_TOKEN="YOUR_TOKEN_HERE"
            EOF
            chmod 600 /etc/dehydrated/cloudflare.env

            cat >> /etc/dehydrated/config << 'EOF'
            CHALLENGETYPE="dns-01"
            HOOK="/etc/dehydrated/hooks/cloudflare.sh"
            EOF

            /usr/local/sbin/dehydrated -c --force

         .. rubric:: Manual Renewal
            :name: manual-renewal

         .. code:: bash

            /usr/local/sbin/dehydrated -c --force

         .. rubric:: Check Certificate Expiry
            :name: check-certificate-expiry

         .. code:: bash

            openssl x509 -in /etc/dehydrated/certs/your-domain/fullchain.pem -noout -dates

         .. rubric:: Security Best Practices
            :name: security-best-practices

         - Protect ``/etc/dehydrated/cloudflare.env`` with
           ``chmod 600``.
         - Keep ownership as ``root:root``.
         - Use scoped Cloudflare API tokens with minimal permissions.
         - Rotate tokens periodically.
         - Monitor ``/var/log/dehydrated.log`` for renewal failures.

         .. rubric:: Related Resources
            :name: related-resources

         - Community
         - Documentation
         - Dehydrated Documentation
         - Let's Encrypt Documentation

         .. container:: version-info

            **Document Last Updated:** June 26, 2026

            **Applies To:** FusionPBX and FS PBX hosts using Cloudflare
            DNS validation and ictVoIP WHMCS FusionPBX integrations

            **Ownership:** Developed and maintained by ictVoIP Canada
