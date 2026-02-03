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

Many deployments use a wildcard certificate for FusionPBX tenant
subdomains (for example, ``*.pbx.yourdomain.com``). A typical high-level
workflow is:

1. **Run the FusionPBX Let's Encrypt helper script**

   Recent FusionPBX installs provide a helper script that integrates
   with ``dehydrated`` to issue certificates, including wildcard
   certificates via DNS-01 challenges.

   At a high level, you will:

   * Change to the directory containing the helper script.
   * Run the script.
   * Provide the wildcard domain and contact email when prompted.

2. **Complete the DNS-01 challenge**

   For wildcard certificates, Let's Encrypt requires a DNS-01 TXT
   record under ``_acme-challenge`` for your domain. The helper script
   will display the exact TXT record value that must be added in your
   DNS provider interface.

   * Add the TXT record for ``_acme-challenge.your-wildcard-base``.
   * Wait for DNS propagation.
   * Confirm propagation using tools such as ``dig`` or your DNS
     provider's diagnostics.
   * Return to the script and continue when the record is visible.

3. **Certificate issuance and storage**

   Once the challenge is validated, the script will:

   * Request the wildcard certificate from Let's Encrypt.
   * Write the certificate files (for example, ``fullchain.pem`` and
     ``privkey.pem``) into a certificate directory managed by
     ``dehydrated``.

   The exact certificate path may vary between environments; consult
   your FusionPBX installation notes for the configured location.

4. **Automatic application to FusionPBX and FreeSWITCH**

   In typical deployments, the helper script will also:

   * Update the web server (for example, nginx) FusionPBX virtual host
     to use the new certificate for the main FQDN.
   * Update FreeSWITCH TLS configuration so that SIP/WebRTC can use the
     same certificate.

   After this step, the primary FusionPBX web interface should be
   available via HTTPS using the new certificate.

5. **Tenant subdomains (wildcard usage)**

   For tenant-specific subdomains (for example,
   ``tenant1.pbx.yourdomain.com``), you typically:

   * Ensure DNS A/AAAA records point to the FusionPBX server.
   * Configure additional HTTPS virtual hosts (server blocks) in your
     web server configuration that:

     * Use the wildcard certificate (``fullchain.pem`` / ``privkey.pem``).
     * Point the document root to the FusionPBX web directory.
     * Mirror the relevant rewrite and location rules from the primary
       FusionPBX virtual host.

   The exact web server configuration will depend on your deployment and
   is outside the scope of this guide, but follows standard FusionPBX
   best practices.

Example nginx Tenant Server Block
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following example illustrates a typical nginx HTTPS server block
for FusionPBX tenant subdomains using a wildcard certificate. Adapt
all hostnames, paths, and PHP-FPM socket names to match your
environment. Typically
/etc/nginx/sites-available/fusionpbx

.. code-block:: nginx

   server {
       listen [::]:443 ssl;
       listen 443 ssl;
       server_name *.pbx.yourdomain.com;

       ssl_certificate     /etc/dehydrated/certs/pbx.yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/dehydrated/certs/pbx.yourdomain.com/privkey.pem;
       ssl_protocols           TLSv1.2 TLSv1.3;
       ssl_prefer_server_ciphers on;
       ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
       ssl_session_cache       shared:SSL:40m;
       ssl_session_timeout     2h;
       ssl_session_tickets     off;

       # redirect websockets to port 8080 (adjust if different)
       location /websockets/ {
           proxy_pass http://127.0.0.1:8080;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection "upgrade";
           proxy_set_header Host $host;
       }

       # redirect Let's Encrypt ACME challenges
       location ^~ /.well-known/acme-challenge {
           default_type "text/plain";
           auth_basic off;
           root /var/www/dehydrated;
       }

       # REST API rewrite example
       if ($uri ~* ^.*/api/.*$) {
           rewrite ^(.*)/api/(.*)$ $1/api/index.php?rewrite_uri=$2 last;
           break;
       }

       # message media example
       rewrite "^/app/messages/media/(.*)/(.*)" \
               /app/messages/message_media.php?id=$1&action=download last;

       access_log /var/log/nginx/access.log;
       error_log  /var/log/nginx/error.log;

       client_max_body_size 80M;
       client_body_buffer_size 128k;

       location / {
           root /var/www/fusionpbx;
           index index.php;
       }

       location ~ \.php$ {
           fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
           fastcgi_read_timeout 15m;
           fastcgi_index index.php;
           include fastcgi_params;
           fastcgi_param SCRIPT_FILENAME /var/www/fusionpbx$fastcgi_script_name;
       }

       # Allow the upgrade routines to run longer than normal
       location = /core/upgrade/index.php {
           fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
           fastcgi_read_timeout 15m;
           fastcgi_index index.php;
           include fastcgi_params;
           fastcgi_param SCRIPT_FILENAME /var/www/fusionpbx$fastcgi_script_name;
       }

       # Basic hardening for hidden files and dotfiles
       location ~ \.htaccess { deny all; }
       location ~ \.htpassword { deny all; }
       location ~^.+\.(db)$ { deny all; }
       location ~ /\.git { deny all; }
       location ~ /\.lua { deny all; }
       location ~ /\. { deny all; }
   }

This example is provided for reference only; always review and
validate configuration against current FusionPBX and nginx best
practices.

6. **Test and reload services**

   After configuring certificates and web server blocks:

   * Test the web server configuration (for example, ``nginx -t``).
   * Reload or restart the web server. (systemctl reload nginx)
   * Verify that both the primary FusionPBX FQDN and any tenant
     subdomains load over HTTPS without certificate warnings.

Renewal and Maintenance
-----------------------

Let's Encrypt certificates are typically valid for 90 days. The
FusionPBX helper script and ``dehydrated`` can be configured to renew
certificates automatically via cron.

Automatic Renewal (Cron + dehydrated)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In many deployments, the FusionPBX installation process installs
``dehydrated`` and registers a cron job that runs it in "cron" mode.
At a high level:

* A daily cron entry calls ``dehydrated -c``.
* ``dehydrated`` checks existing certificates and renews them when they
  are within the renewal window.
* Hook scripts (configured by FusionPBX or your distribution) reload
  the web server and related services after a successful renewal.

Typical components include:

* A ``dehydrated`` executable in a system path (for example,
  ``/usr/local/sbin/dehydrated``).
* Configuration and certificate directories (for example,
  ``/etc/dehydrated/`` and ``/etc/dehydrated/certs/``).
* A cron entry similar to::

      @daily /usr/local/sbin/dehydrated -c

  or, using a specific schedule (for example, every Monday at 05:00)::

      0 5 * * 1 /usr/local/sbin/dehydrated -c

Always adjust these example paths to match your own distribution and
FusionPBX installation notes.

Verifying Renewal Setup
~~~~~~~~~~~~~~~~~~~~~~~

To confirm that automatic renewal is in place:

1. **Check cron configuration**
   
   * As a privileged user, review the root crontab or system cron
     configuration.
   * Look for an entry that runs ``dehydrated -c`` on a regular
     schedule (for example, daily).

2. **Manually test renewal**
   
   * From a shell on the FusionPBX host, run (adjusting the path as
     needed)::

         /usr/local/sbin/dehydrated -c

   * Review the output for any errors related to DNS validation,
     permissions, or connectivity.

3. **Confirm certificate usage**
   
   * Check that the certificate files under the configured certs
     directory have recent modification times.
   * Reload or restart the web server (if not handled automatically by
     hooks) and verify that the renewed certificate is presented by the
     FusionPBX web interface.

General recommendations:

* Ensure the renewal script is scheduled (for example, daily) on the
  FusionPBX host.
* Periodically check certificate expiry dates using ``openssl`` or
  your monitoring tools.
* Confirm that renewed certificates are correctly reloaded by the web
  server and FreeSWITCH.

Automated Wildcard Renewal with Cloudflare
------------------------------------------

The manual DNS-01 challenge workflow described above requires adding a
TXT record each time the certificate renews. For fully automated wildcard
certificate renewal, you can integrate ``dehydrated`` with the Cloudflare
DNS API.

This approach automatically creates and removes the ``_acme-challenge``
TXT records during renewal, eliminating manual intervention.

Prerequisites
~~~~~~~~~~~~~

* Your domain's DNS must be managed by Cloudflare
* A Cloudflare API token with DNS edit permissions
* ``curl`` and ``jq`` installed on the FusionPBX server
* Wildcard A record must exist in Cloudflare DNS for tenant domains

Step 1: Create Cloudflare API Token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Log in to the `Cloudflare Dashboard <https://dash.cloudflare.com>`_
2. Navigate to **My Profile** → **API Tokens**
3. Click **Create Token**
4. Select the **Edit zone DNS** template
5. Configure:

   * **Permissions:** Zone → DNS → Edit
   * **Zone Resources:** Include → Specific zone → ``yourdomain.com``

6. Create the token and copy it immediately

Verify the token from your server::

    curl "https://api.cloudflare.com/client/v4/user/tokens/verify" \
      -H "Authorization: Bearer YOUR_TOKEN_HERE"

Step 2: Install Dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    apt-get update && apt-get install -y jq curl

Step 3: Create Credentials File
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a secure credentials file::

    cat > /etc/dehydrated/cloudflare.env << 'EOF'
    # Cloudflare API Token for DNS-01 challenge
    CF_TOKEN="YOUR_CLOUDFLARE_API_TOKEN_HERE"
    EOF

    chmod 600 /etc/dehydrated/cloudflare.env

Step 4: Create Cloudflare Hook Script
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create the hooks directory and script::

    mkdir -p /etc/dehydrated/hooks

Create ``/etc/dehydrated/hooks/cloudflare.sh``:

.. code-block:: bash

    #!/usr/bin/env bash
    #===============================================================================
    # Cloudflare DNS-01 Hook for Dehydrated
    # Automates wildcard SSL certificate renewal via Cloudflare DNS API
    #===============================================================================

    source /etc/dehydrated/cloudflare.env

    deploy_challenge() {
        local DOMAIN="${1}" TOKEN_FILENAME="${2}" TOKEN_VALUE="${3}"
        
        # Extract base domain (e.g., *.sub.example.com -> example.com)
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
        
        echo "[Cloudflare Hook] Found Zone ID: ${ZONE_ID}"
        
        local RECORD_NAME="_acme-challenge.${DOMAIN}"
        RECORD_NAME=$(echo "$RECORD_NAME" | sed 's/\*\.//')
        
        echo "[Cloudflare Hook] Creating TXT record: ${RECORD_NAME}"
        
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
        
        if [[ "$ZONE_ID" == "null" ]] || [[ -z "$ZONE_ID" ]]; then
            return 0
        fi
        
        local RECORD_NAME="_acme-challenge.${DOMAIN}"
        RECORD_NAME=$(echo "$RECORD_NAME" | sed 's/\*\.//')
        
        echo "[Cloudflare Hook] Cleaning up TXT record: ${RECORD_NAME}"
        
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
        local DOMAIN="${1}" KEYFILE="${2}" CERTFILE="${3}" FULLCHAINFILE="${4}"
        
        echo "[Cloudflare Hook] Certificate deployed for ${DOMAIN}"
        
        systemctl reload nginx 2>/dev/null && echo "[Cloudflare Hook] nginx reloaded" || true
        systemctl restart freeswitch 2>/dev/null && echo "[Cloudflare Hook] freeswitch restarted" || true
    }

    unchanged_cert() {
        local DOMAIN="${1}"
        echo "[Cloudflare Hook] Certificate for ${DOMAIN} is still valid"
    }

    HANDLER="$1"; shift
    if [[ "${HANDLER}" =~ ^(deploy_challenge|clean_challenge|deploy_cert|unchanged_cert)$ ]]; then
        "$HANDLER" "$@"
    fi

Make the script executable::

    chmod +x /etc/dehydrated/hooks/cloudflare.sh

Step 5: Configure Dehydrated for DNS-01
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add the following to ``/etc/dehydrated/config``::

    # Use DNS-01 challenge (required for wildcard certs)
    CHALLENGETYPE="dns-01"

    # Cloudflare hook script for DNS record management
    HOOK="/etc/dehydrated/hooks/cloudflare.sh"

Verify the configuration::

    grep -E "^(CHALLENGETYPE|HOOK)=" /etc/dehydrated/config

Step 6: Configure Domains
~~~~~~~~~~~~~~~~~~~~~~~~~

Ensure ``/etc/dehydrated/domains.txt`` includes both your wildcard domain
AND your host FQDN::

    *.pbx.yourdomain.com > pbx.yourdomain.com
    pbx.yourdomain.com

.. important::

   You need **two entries** in ``domains.txt``:

   1. **Wildcard domain** (``*.pbx.yourdomain.com``) - for tenant subdomains
   2. **Host FQDN** (``pbx.yourdomain.com``) - for the main server hostname

   A wildcard certificate for ``*.pbx.yourdomain.com`` does **NOT** cover
   ``pbx.yourdomain.com`` (different subdomain pattern). The host FQDN
   needs its own separate certificate.

The format ``*.domain.com > domain.com`` tells dehydrated to:

* Request a wildcard certificate for ``*.pbx.yourdomain.com``
* Store it in a directory named ``pbx.yourdomain.com``

Step 7: Test Automated Renewal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Force a renewal to verify the automation works::

    /usr/local/sbin/dehydrated -c --force

Expected output includes::

    [Cloudflare Hook] Looking up zone for: yourdomain.com
    [Cloudflare Hook] Found Zone ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    [Cloudflare Hook] Creating TXT record: _acme-challenge.pbx.yourdomain.com
    [Cloudflare Hook] TXT record created successfully
    [Cloudflare Hook] Waiting 30 seconds for DNS propagation...
    ...
    [Cloudflare Hook] Cleaning up TXT record: _acme-challenge.pbx.yourdomain.com
    [Cloudflare Hook] TXT record deleted
    [Cloudflare Hook] Certificate deployed for *.pbx.yourdomain.com

Once configured, the daily cron job (``dehydrated -c``) will automatically
renew wildcard certificates without manual DNS intervention.

File Locations Summary
~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - File
     - Purpose
   * - ``/etc/dehydrated/config``
     - Main dehydrated configuration
   * - ``/etc/dehydrated/domains.txt``
     - List of domains to manage
   * - ``/etc/dehydrated/cloudflare.env``
     - Cloudflare API credentials
   * - ``/etc/dehydrated/hooks/cloudflare.sh``
     - DNS-01 challenge hook script
   * - ``/etc/dehydrated/certs/``
     - Generated certificates
   * - ``/var/log/dehydrated.log``
     - Renewal log (if cron configured)

Automated Setup Script
~~~~~~~~~~~~~~~~~~~~~~

For ictVoIP managed FusionPBX servers, an automated setup script
(``ict_setup_fusionpbx_wildcard.sh``) is available upon request. This
script handles:

* DNS record verification and creation in Cloudflare
* Hook script installation and configuration
* Dehydrated configuration for DNS-01 challenge
* Automatic cron job setup for daily renewals
* Both wildcard and host FQDN certificate requests

Contact ictVoIP support to request the automated setup script for your
deployment.

Security Best Practices
~~~~~~~~~~~~~~~~~~~~~~~

* **Protect credentials:** Ensure ``cloudflare.env`` has mode ``600`` and
  is owned by root.
* **Use scoped tokens:** Create API tokens with minimal permissions
  (only DNS edit for specific zones).
* **Rotate tokens periodically:** Update ``cloudflare.env`` with new
  tokens as part of regular security maintenance.
* **Monitor renewals:** Check ``/var/log/dehydrated.log`` for failures.

Troubleshooting
---------------

Common issues and checks:

* **TXT record errors:** Verify that the DNS TXT record for the
  DNS-01 challenge is added correctly and has propagated before
  continuing the script.
* **Web server configuration errors:** Use the web server's built-in
  configuration test (for example, ``nginx -t``) to identify syntax or
  path issues.
* **Certificate management app differences:** Some FusionPBX versions
  may not include a GUI certificate management app. In these cases,
  follow the recommended CLI-based approach for your version.
* **Renewal failures:** Review the renewal script logs and ensure your
  DNS provider and firewall rules still allow the validation method
  (DNS-01 or HTTP-01) you are using.
* **Cloudflare hook errors:** If using the Cloudflare automation:

  * Verify the API token has DNS edit permissions for the correct zone.
  * Check for stale ``_acme-challenge`` TXT records in Cloudflare DNS.
  * Test zone lookup manually::

        source /etc/dehydrated/cloudflare.env
        curl -s "https://api.cloudflare.com/client/v4/zones?name=yourdomain.com" \
          -H "Authorization: Bearer ${CF_TOKEN}" | jq .

  * Increase the DNS propagation wait time in the hook script if
    challenges fail due to timing issues (change ``sleep 30`` to
    ``sleep 60``).

For deployment-specific examples and deeper operational details, refer
to your internal deployment documentation or consult ictVoIP Canada
support.
