Security Hardening Overview
===========================

Overview
--------

This guide provides a high-level overview of security best practices
for deploying ictVoIP Billing v1.4.0 with WHMCS and supported PBX
modules such as FusionPBX and Vodia. It focuses on concepts and
checklists rather than environment-specific implementation details.

Core Security Principles
------------------------

* **HTTPS Everywhere** – Require HTTPS for all WHMCS, ictVoIP Billing,
  and PBX web interfaces, and use trusted certificates (for example,
  Let's Encrypt) while monitoring expiry.

* **Least-Privilege Administration** – Restrict WHMCS admin access to
  named admin accounts and use WHMCS admin roles plus the ictVoIP
  Billing addon access control settings to limit who can manage
  billing and provisioning.

* **IP Whitelisting for APIs** – For PBX APIs (such as FusionPBX), use
  IP/CIDR whitelists to restrict which systems can access the APIs and
  ensure the WHMCS server IP (and any management hosts) are added to
  the whitelist.

* **Strong Authentication** – Use strong, unique passwords for WHMCS,
  PBX admin accounts, and any dedicated API users, and consider IP
  restrictions and MFA where supported by your platform.

* **Segregation of Environments** – Maintain separate development,
  staging, and production environments and never test experimental
  code directly on production.

WHMCS & ictVoIP Billing
-----------------------

When configuring ictVoIP Billing within WHMCS:

* Ensure the WHMCS **System URL** is set to ``https://``.
* Restrict addon module access to specific admin roles/groups.
* Use WHMCS configuration options (such as IP restrictions or 2FA) to
  harden admin logins.

For details on addon installation and license configuration, see
:doc:`/admin/ictvoipbilling`.

PBX API Security (FusionPBX Example)
------------------------------------

For FusionPBX integrations:

* Enable HTTPS for the FusionPBX web interface and APIs.
* Use the FusionPBX API whitelist mechanism to restrict access to trusted IPs and subnets, and ensure the WHMCS server IP (and any management hosts) are present in the whitelist before using the **Test Connection** button or running health checks.
* Use the ictVoIP Billing **Client Services** or **Server Provisioning Settings** tools to run credential and whitelist tests against your PBX servers so you can confirm that the WHMCS host can reach the API endpoints before enabling automated provisioning.
* Keep FusionPBX and its dependencies updated with security patches.

For an overview of the FusionPBX APIs and security model, see
:doc:`/modules/fusionpbx` and :doc:`/modules/fusionpbx/api_endpoints`.

Monitoring & Logging
--------------------

* Monitor web server logs (access and error) for WHMCS and PBX hosts.
* Monitor PHP error logs on both WHMCS and PBX servers.
* Configure alerts for repeated failed login attempts or unusual API
  access patterns.

Regular Reviews
---------------

Security is an ongoing process. Periodically:

* Review WHMCS admin users and roles.
* Confirm that IP whitelists still match your infrastructure.
* Verify HTTPS configuration, ciphers, and certificate validity.
* Apply security updates to the OS, web server, PHP, database, and
  PBX software.

For environment-specific hardening guidance, consult your hosting
provider, PBX vendor documentation, and ictVoIP Canada support.
