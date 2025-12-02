Backup Strategy Overview
========================

Overview
--------

Reliable backups are essential for protecting your ictVoIP Billing and
PBX environments. This guide provides a high-level backup strategy for
ictVoIP Billing v1.4.0 deployments using WHMCS and supported PBX
modules.

What Needs to Be Backed Up
--------------------------

At a minimum, ensure you back up the following components:

* **WHMCS Database**
  - Contains all client, product, invoice, and ictVoIP Billing addon
    data.

* **WHMCS Files**
  - WHMCS core files and the ictVoIP Billing addon directory.
  - Custom templates, hooks, and configuration files.

* **PBX Database** (for example, FusionPBX PostgreSQL database)
  - Contains domains, extensions, dialplans, gateways, and CDR
    references.

* **PBX Configuration Files**
  - Web server configuration for the PBX (for example, nginx
    virtual hosts).
  - PBX configuration directories and custom API scripts.

* **SSL/TLS Certificates**
  - Certificates and keys for WHMCS and PBX HTTPS endpoints.

Backup Frequency
----------------

Backup frequency depends on your change and billing volume, but a
common pattern is:

* **Daily**
  - WHMCS database dump.
  - PBX database dump.

* **Weekly**
  - WHMCS and PBX application files.
  - Web server and PBX configuration files.

* **Before Upgrades**
  - Full snapshot of WHMCS database and files.
  - Full snapshot of PBX database and configuration.

Storage & Retention
-------------------

* Store backups on separate storage from the production servers.
* Use multiple retention layers:
  - Short-term (for example, 7–14 days) for quick recovery.
  - Medium-term (for example, 4–8 weeks) for billing dispute windows.
  - Long-term archives, if required by your business or regulations.
* Encrypt sensitive backups at rest and in transit.

Testing Backups
---------------

Backups are only useful if they can be restored. Periodically:

* Test restoring the WHMCS database to a non-production environment.
* Test restoring the PBX database and configuration in a lab system.
* Verify that ictVoIP Billing addon pages and PBX services operate
  normally in the restored environment.

Coordination with Upgrades
--------------------------

Before performing upgrades of:

* WHMCS
* ictVoIP Billing addon
* PBX server modules (for example, FusionPBX module)
* PBX software itself

Always:

* Take a fresh backup of all relevant databases and configuration
  files.
* Confirm the backup files are complete and accessible.

For detailed restore procedures, see :doc:`getting_started/restore`.
