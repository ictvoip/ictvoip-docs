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

The ictVoIP FusionPBX Server Module installs a standard set of
application-level APIs on your FusionPBX host. These APIs are used by
ictVoIP Billing and WHMCS for provisioning, monitoring, and billing
operations. Each API is implemented as one or more HTTP endpoints
behind the scenes, but those internal paths are not exposed here for
security and intellectual-property reasons.

The main custom applications and their responsibilities are:

**Access Control & Whitelist (`access_controls` / `access_control`)**

* Manages API access control lists and IP/CIDR whitelists.
* Provides connectivity and readiness checks used by the Health
  Check and "Test Connection" tools.

**Destinations / Inbound Routing (`destinations`, `inbound`)**

* Manages inbound destinations (DIDs) for tenant domains.
* Supports create, update, and delete operations for inbound routes
  and links them to tenants and billing rules.

**Outbound Dialplan (`dialplan_outbound` / `outbound`)**

* Manages outbound dialplans and routing patterns per tenant.
* Controls how outbound calls are normalized, matched, and routed to
  gateways based on country codes, prefixes, and service plans.

**Dialplans (`dialplans`)**

* Provides supporting dialplan utilities used by other applications.
* Helps maintain consistent contexts and patterns across tenants.

**Domains (`domains` / `domain`)**

* Manages tenant domains in multi-tenant deployments.
* Supports creating, updating, and querying tenants, including
  synchronized limits and descriptions used by Client Services.

**Extensions (`extensions` / `extension`)**

* Handles lifecycle management for extensions (create, update,
  disable, delete) in alignment with tenant domains and WHMCS
  services.
* Ensures extension properties (number ranges, passwords, limits)
  match the client’s assigned package and billing configuration.

**Gateways (`gateway`, `provision`, `provision-list`)**

* Provisions and manages SIP gateways for tenant domains.
* Provides operations to create or modify gateways and to list
  configured gateways for synchronization and monitoring.

**Registrations (`registrations` / `registration`)**

* Exposes registration status information for extensions and
  gateways.
* Used by dashboards and troubleshooting tools to show whether
  devices are currently registered and reachable.

**System Status (`status`)**

* Provides a lightweight health and status view of the FusionPBX
  instance.
* Used by WHMCS and internal dashboards to confirm basic system
  availability and high-level metrics.

**XML CDR & Billing (`xml_cdr`)**

* Implements CDR collection, validation, export, and import
  workflows.
* Provides connectivity checks, CDR availability checks, and data
  retrieval/export functions used by autobill, real-time billing,
  and reporting tools.

.. list-table:: Custom FusionPBX applications and WHMCS usage
   :header-rows: 1

   * - Application
     - Aliases
     - Primary WHMCS usage
   * - Access Control & Whitelist
     - ``access_controls``, ``access_control``
     - Health Check, Test Connection tools, and API whitelist validation in Client Services.
   * - Destinations / Inbound Routing
     - ``destinations``, ``inbound``
     - Managing inbound DIDs and destinations for tenants in Client Services.
   * - Outbound Dialplan
     - ``dialplan_outbound``, ``outbound``
     - Managing outbound routing patterns and normalisation rules for tenants.
   * - Dialplans
     - ``dialplans``
     - Supporting dialplan utilities referenced by other provisioning flows.
   * - Domains
     - ``domains``, ``domain``
     - Tenant creation, updates, and synchronisation in Client Services.
   * - Extensions
     - ``extensions``, ``extension``
     - Extension provisioning and lifecycle management from WHMCS services.
   * - Gateways
     - ``gateway``, ``provision``, ``provision-list``
     - Gateway provisioning, listing, and synchronisation in Client Services.
   * - Registrations
     - ``registrations``, ``registration``
     - Status views and diagnostics for registered devices and gateways.
   * - System Status
     - ``status``
     - High-level FusionPBX health and availability checks used by dashboards.
   * - XML CDR & Billing
     - ``xml_cdr``
     - CDR collection and export/import workflows for autobill and reporting.

Each of these applications exposes a version string that is
displayed in the ictVoIP Billing **System Health Check** under the
FusionPBX section, allowing you to verify that the correct API set
and versions are installed.

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

