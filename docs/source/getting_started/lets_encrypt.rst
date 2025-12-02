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
environment.

.. code-block:: nginx

   server {
       listen [::]:443 ssl;
       listen 443 ssl;
       server_name *.pbx.yourdomain.com;

       ssl_certificate     /etc/letsencrypt/live/pbx.yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/pbx.yourdomain.com/privkey.pem;
       ssl_protocols           TLSv1.2 TLSv1.3;
       ssl_prefer_server_ciphers on;
       ssl_ciphers             ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:
                               ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:
                               ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:
                               DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
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
       location ~ /\.
   }

This example is provided for reference only; always review and
validate configuration against current FusionPBX and nginx best
practices.

6. **Test and reload services**

   After configuring certificates and web server blocks:

   * Test the web server configuration (for example, ``nginx -t``).
   * Reload or restart the web server.
   * Verify that both the primary FusionPBX FQDN and any tenant
     subdomains load over HTTPS without certificate warnings.

Renewal and Maintenance
-----------------------

Let's Encrypt certificates are typically valid for 90 days. The
FusionPBX helper script and ``dehydrated`` can be configured to renew
certificates automatically via cron.

General recommendations:

* Ensure the renewal script is scheduled (for example, daily) on the
  FusionPBX host.
* Periodically check certificate expiry dates using ``openssl`` or
  your monitoring tools.
* Confirm that renewed certificates are correctly reloaded by the web
  server and FreeSWITCH.

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

For deployment-specific examples and deeper operational details, refer
to your internal deployment documentation or consult ictVoIP Canada
support.
