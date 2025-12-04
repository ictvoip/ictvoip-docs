Firewall & Network Access Overview
=================================

Overview
--------

This guide provides high-level guidance on firewall and network access
considerations for deploying ictVoIP Billing with WHMCS and PBX
modules. It does not replace detailed network design or security
policies, but highlights key ports and flows to consider.

Core Principles
---------------

* **Default-Deny Inbound**
  - Block unsolicited inbound traffic by default.
  - Only allow the specific ports and sources required for web access
    and SIP/media.

* **Restricted Management Access**
  - Limit SSH, database, and other management ports to trusted
    administrative networks.

* **Segregate Web, DB, and PBX Roles**
  - Where possible, separate WHMCS, database, and PBX components into
    appropriate network segments.

For guidance on HTTPS certificate issuance and automatic renewal for
FusionPBX hosts (for example, Let's Encrypt and ``dehydrated``
workflows), see :doc:`getting_started/lets_encrypt`.

Typical Port Considerations
---------------------------

The exact ports depend on your PBX and infrastructure, but commonly:

* **WHMCS / ictVoIP Billing (Web)**
  - TCP 443 (HTTPS) from admin and client networks.

* **FusionPBX / PBX Web Interface**
  - TCP 443 (HTTPS) from WHMCS server and admin networks.

* **PBX Signaling and Media (example only)**
  - UDP/TCP 5060 or alternate SIP ports.
  - RTP/media port ranges as defined by your PBX configuration.

* **Database Access**
  - Database ports (for example, PostgreSQL or MySQL) restricted to
    application servers only.

API Whitelisting
----------------

For PBX APIs (such as the FusionPBX integration):

* Restrict API access to known, trusted IPs (for example, WHMCS server
  IP and designated management hosts).
* Use PBX-level IP whitelisting (where available) in addition to
  network firewalls.
* Ensure that any "Test Connection" or Health Check functionality is
  using IPs that are explicitly allowed.

Best Practices
--------------

* Maintain clear network diagrams showing:
  - WHMCS and ictVoIP Billing host locations.
  - PBX servers and their signaling/media paths.
  - Database servers and admin/monitoring systems.
* Use VPN or private links for sensitive management traffic where
  possible.
* Monitor firewall logs for unexpected connection attempts.
* Regularly review access rules as infrastructure evolves.

For environment-specific firewall rules, consult your firewall vendor
or hosting provider documentation.
