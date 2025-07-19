FusionPBX Integration
====================

Overview
--------

FusionPBX is a powerful open-source communications platform that provides a comprehensive web-based interface for managing FreeSWITCH. The ictVoIP Billing integration extends FusionPBX with custom APIs, themes, and WHMCS integration capabilities.

Key Features
-----------

* **Custom API Endpoints** - RESTful APIs for extension management, registration status, and CDR collection
* **ictVoIP Branding** - Custom login page and theme with company branding
* **WHMCS Integration** - Automated provisioning and billing through WHMCS
* **Gateway Management** - Programmatic gateway provisioning and monitoring
* **CDR Collection** - Automated call detail record collection for billing
* **Multi-tenant Support** - Support for multiple domains and tenants

API Access Whitelist
--------------------

The `/app/xml_cdr/chkcon.php` endpoint now uses an IP and CIDR-based whitelist for authentication. Only requests originating from trusted IP addresses or subnets listed in the `chkcon_whitelist.conf` file will be granted API access.

- No username or password is required for whitelisted IPs.
- All other requests will be denied with a clear error message.
- The whitelist is managed in a plain text file (`chkcon_whitelist.conf`), one IP or CIDR per line.

**Sample whitelist file:**
::
    # chkcon_whitelist.conf
    192.168.1.100
    192.168.1.0/24

Supported Versions
-----------------

* **FusionPBX v5.3.x** (Recommended)
* **FusionPBX v5.1.x** (Legacy support)
* **FreeSWITCH v1.10+**
* **PostgreSQL v12+**

Architecture
-----------

The ictVoIP FusionPBX integration consists of several components:

* **API Layer** - Custom PHP endpoints for external integration
* **Theme Layer** - Custom branding and user interface modifications
* **Database Layer** - Extended schema for billing and provisioning
* **WHMCS Module** - Client portal integration and automation

.. toctree::
   :maxdepth: 2

   fusionpbx/installation
   fusionpbx/configuration
   fusionpbx/api_endpoints
   fusionpbx/troubleshooting 
