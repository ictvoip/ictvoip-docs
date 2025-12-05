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
* **NEW** **Client Facing Self Provisioning Support** - Client Facing addon **ictVoIP Box** for Selling Direct to Public

API Access Whitelist
--------------------
|

.. image:: ../_static/images/fusionpbx/whitelist_manager.png
   :width: 900px
   :align: center
   :alt: ictVoIP Whitelist Manager
|

The `chkcon.php` endpoint now uses multi authentication using an IP and CIDR-based whitelist for authentication. Only requests originating from trusted IP addresses or subnets listed in the `chkcon_whitelist.conf` file will be granted API access and we also recommend using an API user with API Key Tokens.

* Include an API username and password recommended with whitelisted IPs for better security.
* Include an API Key Token is also recommended with whitelisted IPs for better security.
* All other requests will be denied with a clear error message.
* The whitelist is managed by (`chkcon_whitelist.conf`), one IP or CIDR per line.

**Sample whitelist file:**
::
 
    # chkcon_whitelist.conf
    192.168.1.100

Supported Versions
-----------------

* **FusionPBX v5.4.x** (Recommended)
* **FusionPBX v5.3.x** (Legacy support)
* **FreeSWITCH v1.10+**
* **PostgreSQL v12+**
* **PHP8.1 - PHP8.3**
* **ionCube Loader v14**

Architecture
-----------

The ictVoIP FusionPBX integration consists of several components:

* **API Layer** - Custom PHP endpoints for external integration
* **Theme Layer** - Custom branding and user interface modifications
* **Database Layer** - Extended schema for billing and provisioning
* **WHMCS Module** - Client portal integration and automation

In a typical ictVoIP Billing v1.4.0 deployment:

* **PBX servers** are defined in WHMCS (see :doc:`/admin/servers`) and
  store the FusionPBX host details, credentials, and optional access
  hash used by the APIs.
* **Providers and tariffs** (see :doc:`/admin/providers`) sit on top of
  those servers and control how usage is rated for client services.
* The **provisioning flow** (see :doc:`/applications/provision`) links
  WHMCS products, providers, and FusionPBX tenants so that new orders
  can automatically create or update tenants, gateways, and
  extensions.
* **SSL/TLS and whitelist configuration** for FusionPBX are covered in
  :doc:`/getting_started/lets_encrypt` and
  :doc:`/getting_started/security`, and the ictVoIP Billing **Client
  Services / Server Provisioning Settings** tools can be used to test
  FusionPBX credentials and API whitelisting before enabling automated
  provisioning.

Included APIs & Versions
-------------------------

The ictVoIP FusionPBX Server Module installs a standard set of API
endpoints on your FusionPBX host. These APIs are used by ictVoIP
Billing and WHMCS for provisioning, monitoring, and billing
operations.

**Gateway Management APIs**
* Purpose: Provision and manage SIP gateways for tenant domains.
* Example endpoints: `/app/gateways/manage_gateway.php` (gateway CRUD and listing used by the WHMCS server module), `/app/gateways/provision.php` (provision or refresh a single gateway), `/app/gateways/provision_list.php` (return a list of configured gateways for monitoring and sync).

**Domain Management APIs**
* Purpose: Manage tenant domains (create, update, query) for multi-tenant deployments.
* Example endpoint: `/app/domains/manage_domain.php` (tenant domain CRUD operations with centralized whitelist security).

**Destinations Management APIs**
* Purpose: Manage inbound destinations (DIDs) for tenants.
* Example endpoint and version: `/app/destinations/manage_destinations.php` (DID CRUD and listing for tenant domains), version `1.2.7-destinations`.

**Outbound Dialplan Management APIs**
* Purpose: Manage outbound dialplans and routing patterns per tenant.
* Example endpoint and version: `/app/dialplan_outbound/manage_outbound.php` (outbound dialplan CRUD and listing for tenant contexts), version `1.2.5-outbound`.

**Extension Management APIs**
* Purpose: Create, update, and delete extensions aligned with tenant domains and service plans.
* Example endpoint and version: `/app/extensions/manage_extension.php` (extension CRUD and provisioning operations), version `2.0-extensions`.

**Registration Status APIs**
* Purpose: Check SIP registration status for extensions.
* Example endpoint: `/app/registrations/check_registration.php` (returns registration state and basic registration details for a specific extension and tenant).

**System Status APIs**
* Purpose: Report FusionPBX health and basic metrics for dashboards.
* Example endpoint: `/app/status/index.php` (lightweight status probe returning high-level system information).

**CDR Management APIs**
* Purpose: Support billing and reporting workflows by exporting and validating call detail records.
* Example endpoints: `/app/xml_cdr/check_cdrs.php` (CDR availability and basic consistency checks), `/app/xml_cdr/chkcon.php` (connectivity / whitelist / API readiness check used by "Test Connection" and Health Check), `/app/xml_cdr/export_cdr.php` (export CDRs over a specified time range), `/app/xml_cdr/get_cdr_data.php` (retrieve CDR data for analysis and reporting), `/app/xml_cdr/import_cdr.php` (import CDR data from external sources).

**Access Control & Whitelist APIs**
* Purpose: Support safe operation of all APIs via centralized access control and whitelisting.
* Example endpoints: `/app/access_controls/manage_access_control.php` (view access control lists and validate API deployment/version), `/app/xml_cdr/whitelist_manager.php` (manage IP and CIDR entries allowed to access the APIs).

Each of these APIs advertises a version string that is displayed in
the ictVoIP Billing **System Health Check** under the FusionPBX
section, allowing you to verify that the correct API set and
versions are installed.

At a high level, these APIs are consumed by:

* The **Client Services Admin Area** (:doc:`/admin/client_services`),
  which uses the domain, gateway, destination, extension, and access
  control APIs to manage tenants and related resources from within
  WHMCS.
* The **Autobill** components (:doc:`/admin/autobill`), which use the
  CDR-related APIs to collect call records and support usage-based
  billing.

The implementation details of these integrations are handled by the
WHMCS server modules and addon; administrators interact primarily with
the higher-level Client Services and Billing Management screens.

.. toctree::
   :maxdepth: 2

   fusionpbx/installation
   fusionpbx/configuration
   fusionpbx/api_endpoints
   fusionpbx/troubleshooting

