FusionPBX API Endpoints
======================

Overview
--------

This document provides an overview of the API endpoints available for FusionPBX integration. These endpoints enable programmatic access to FusionPBX functionality for external system integration and automation.

In ictVoIP Billing v1.4.0, these APIs are primarily consumed by the
WHMCS server modules and addon features such as the **Client Services
Admin Area** (:doc:`/admin/client_services`) and **Autobill**
(:doc:`/admin/autobill`). Administrators normally interact with those
higher-level tools; this page is intended for advanced integration,
troubleshooting, and staging validation.

For day-to-day administration, **authentication and IP whitelist
checks** for these APIs are exposed through the Client Services
**Settings (Server Provisioning Settings)** screen. From there you can
load and save WHMCS server credentials (including an optional access
hash) for FusionPBX hosts and run credential and whitelist tests before
enabling automated provisioning. Use this when first connecting a PBX
server or when rotating credentials or tightening whitelists. See also
the :doc:`/admin/servers` guide and the security hardening overview in
the :doc:`/getting_started/security` documentation.

For information on upgrading the FusionPBX API set and server module between
releases, see :doc:`/upgrades`.

.. note::
   All ictVoIP FusionPBX API scripts are distributed as ionCube-
   encoded PHP files and require **ionCube Loader v14+** to be
   installed and active on both the FusionPBX host PHP environment
   and the WHMCS host PHP environment.

API Summary
-----------
The table below summarizes the core ictVoIP FusionPBX applications
used by ictVoIP Billing and WHMCS. Each application advertises a
version string that can be viewed in the ictVoIP Billing **System
Health Check** under the FusionPBX section. Internal endpoint paths
are intentionally not exposed here.

.. list-table:: FusionPBX applications and primary use
   :header-rows: 1
   :widths: 25 35 40

   * - Application
     - Aliases
     - Primary Use
   * - Access Control & Whitelist
     - ``access_controls``, ``access_control``
     - Health Check, Test Connection tools, and API whitelist validation for FusionPBX servers.
   * - Destinations / Inbound Routing
     - ``destinations``, ``inbound``
     - Managing inbound DIDs and destinations for tenants, linked to billing.
   * - Outbound Dialplan
     - ``dialplan_outbound``, ``outbound``
     - Managing outbound dialplans and routing patterns per tenant.
   * - Dialplans
     - ``dialplans``
     - Supporting dialplan utilities referenced by other provisioning flows.
   * - Domains
     - ``domains``, ``domain``
     - Tenant creation, updates, and synchronisation with Client Services.
   * - Extensions
     - ``extensions``, ``extension``
     - Extension provisioning and lifecycle management tied to WHMCS services.
   * - Gateways
     - ``gateway``, ``provision``, ``provision-list``
     - SIP gateway provisioning, listing, and synchronisation in Client Services.
   * - Registrations
     - ``registrations``, ``registration``
     - Registration status checks for extensions and gateways.
   * - System Status
     - ``status``
     - High-level FusionPBX health and availability checks used by dashboards.
   * - XML CDR & Billing
     - ``xml_cdr``
     - CDR collection and export/import workflows for autobill and reporting.

For parameter details, example requests, and response formats, see
the endpoint sections below.

Authentication
--------------

FusionPBX APIs use a combination of **IP/CIDR-based whitelisting** and
an **API integration identity** (API user plus optional access
hash/token).

**Authentication Requirements:**

* API integration user (dedicated account for ictVoIP Billing).
* Access hash or API token (where configured) and/or API password.
* Calling host must be on the IP/CIDR whitelist for the FusionPBX
  server.
* Requests from non-whitelisted IPs will be denied and logged.
* The whitelist is typically managed using the chkcon whitelist
  configuration or the Whitelist Manager utility on the FusionPBX
  host.

|

.. image:: ../../_static/images/fusionpbx/whitelist_manager.png
   :width: 900px
   :align: center
   :alt: ictVoIP Whitelist Manager
|

**Response Examples:**

.. code-block:: json

    {
      "success": 1,
      "message": "API Access Granted: Whitelisted IP"
    }

    {
      "success": 0,
      "message": "API Access Denied: Only whitelisted IPs may access this endpoint."
    }

WHMCS Integration Note
----------------------

When configuring the FusionPBX server in WHMCS, the **Test Connection**
button checks API access using the server definition, which includes
the API integration user, optional access hash/token, and the
whitelisted IP of the WHMCS host. Ensure the WHMCS server's public IP
is present on the FusionPBX whitelist before enabling automated
provisioning.

**Verification steps (Client Services / Settings – Server Provisioning Settings):**

1. Open **Client Services** in the WHMCS Admin Area
   (:doc:`/admin/client_services`).
2. Select the relevant FusionPBX server and open **Settings** →
   **Server Provisioning Settings**.
3. Confirm the API integration user and access hash/token values.
4. Click **Test Connection** to validate credentials, whitelist, and
   basic API readiness.
5. Resolve any reported errors (credentials, whitelist, or SSL) before
   turning on automated provisioning or autobill.

API Endpoints
-------------

Status API
~~~~~~~~~~

**Purpose:** System health and status monitoring within WHMCS Admin Dashboard.

**Method:** POST

**Parameters:**
* Username (required): Administrator username
* Password (required): Administrator password
* Whitelisted (required): Whitelist Managed

**Response Format:**

.. code-block:: json

    {
      "status": "success",
      "message": "System operational",
      "timestamp": "2024-01-15T10:30:00Z",
      "version": "5.3.8",
      "uptime": "7 days, 3 hours",
      "active_calls": 5,
      "total_extensions": 150,
      "registered_extensions": 142
    }

Registration Status API
~~~~~~~~~~~~~~~~~~~~~~~

**Purpose:** Check extension registration status.

**Method:** POST

**Parameters:**
* Username (required): Administrator username
* Password (required): Administrator password
* Extension (required): Extension number to check
* Tenant Domain (required): Domain/tenant identifier

**Response Format:**

.. code-block:: json

    {
      "status": "success",
      "message": "Extension status retrieved",
      "registered": "yes",
      "register_ip": "192.168.1.100",
      "register_port": "5060",
      "register_useragent": "SIP Client/1.0"
    }

Gateway Provisioning API
~~~~~~~~~~~~~~~~~~~~~~~~

**Purpose:** Manage SIP gateway configurations.

**Method:** POST

**Parameters:**
* Username (required): Administrator username
* Password (required): Administrator password
* Gateway Name (required): Unique gateway identifier
* Gateway Domain (required): Gateway server address
* Gateway Username (required): Gateway authentication username
* Gateway Password (required): Gateway authentication password

**Response Format:**

.. code-block:: json

    {
      "status": "success",
      "message": "Gateway configured successfully",
      "gateway_uuid": "550e8400-e29b-41d4-a716-446655440000",
      "gateway_name": "primary_gateway",
      "gateway_domain": "sip.provider.com",
      "gateway_enabled": "true"
    }

Gateway List API
~~~~~~~~~~~~~~~~

**Purpose:** Retrieve configured gateway information.

**Method:** POST

**Parameters:**
* Username (required): Administrator username
* Password (required): Administrator password

**Response Format:**

.. code-block:: json

    {
      "status": "success",
      "message": "Gateways retrieved successfully",
      "gateways": [
        {
          "gateway_uuid": "550e8400-e29b-41d4-a716-446655440000",
          "gateway_name": "primary_gateway",
          "gateway_domain": "sip.provider.com",
          "gateway_enabled": "true",
          "gateway_status": "UP"
        }
      ]
    }

CDR Export API
~~~~~~~~~~~~~~

**Purpose:** Export call detail records for billing and reporting.

**Method:** POST

**Parameters:**
* Username (required): Administrator username
* Password (required): Administrator password
* Date Start (required): Start date for CDR export
* Date End (required): End date for CDR export
* Format (optional): Export format (JSON, CSV, XML)

**Response Format:**

.. code-block:: json

    {
      "status": "success",
      "message": "CDR export completed",
      "total_records": 1250,
      "date_range": "2024-01-01 to 2024-01-31",
      "export_format": "JSON"
    }

The exact URLs and deployment structure for these APIs are
intentionally not documented here. All calls are made by the ictVoIP
Billing server modules and addons using server definitions and
credentials configured in WHMCS.

Developer Notes
---------------

* These APIs are designed to be consumed **indirectly** via ictVoIP
  Billing and the associated WHMCS server modules and addons. Custom
  integrations should follow the same authentication and whitelist
  model.
* Each FusionPBX application (for example, access control, gateways,
  domains, extensions, registrations, status, XML CDR) exposes a
  **version string** that is surfaced in the ictVoIP Billing **System
  Health Check** under the FusionPBX section.
* When APIs are updated, the application version is incremented so
  that operators can verify that all FusionPBX servers are running the
  expected API set before enabling new features.

Error Handling
-------------

All API endpoints return consistent error responses in the following format:

.. code-block:: json

    {
      "status": "error",
      "message": "Descriptive error message",
      "timestamp": "2024-01-15T10:30:00Z"
    }

**Common Error Codes:**

* **Authentication Failed**: Invalid credentials
* **Missing Parameters**: Required parameters not provided
* **Invalid Request**: Malformed request data
* **Server Error**: Internal system error
* **Rate Limited**: Too many requests

Rate Limiting
-------------

API endpoints implement rate limiting to prevent abuse and ensure system stability.

**Rate Limits:**

* **Standard Endpoints**: 100 requests per minute
* **CDR Export**: 10 requests per minute
* **Gateway Operations**: 50 requests per minute

**Rate Limit Headers:**

.. code-block:: text

    X-RateLimit-Limit: 100
    X-RateLimit-Remaining: 95
    X-RateLimit-Reset: 1642234560

Security Considerations
----------------------

**Network Security:**

* Use HTTPS for all API communications
* Implement proper firewall rules
* Consider VPN access for sensitive operations

**Authentication Security:**

* Use strong, unique passwords
* Implement API key rotation
* Monitor authentication attempts

**Data Protection:**

* Encrypt sensitive data in transit
* Implement proper access controls
* Regular security audits

**Monitoring and Logging:**

* Log all API access attempts
* Monitor for suspicious activity
* Regular security assessments 
