FS PBX Integration
******************

.. important::

   Before configuring the FS PBX server module, ensure:

   * ictVoIP Billing v1.5.0 or later is installed and activated.
   * The FS PBX server module files are in place on WHMCS.
   * You have FS PBX API credentials (host, API user, and access hash or
     token).
   * The WHMCS server public IP is whitelisted on the FS PBX host.
   * A matching provider is configured in ictVoIP Billing.

Overview
========

ictVoIP Billing v1.5.0 adds **FS PBX** as a second supported PBX
platform alongside FusionPBX. Client Services can now detect the
correct provider backend and route tenant, extension, destination, and
user workflows to either FusionPBX or FS PBX automatically.

FS PBX support includes:

* Multi-provider detection in the ictVoIP Billing addon.
* FS PBX-specific Client Services API endpoints for tenant and user
  management.
* FS PBX destination management, including ring groups.
* Shared gateway and route template workflows where applicable.

Supported Operations
====================

The following Client Services operations are available for FS PBX:

* **Tenant domain creation** — create a new FS PBX tenant domain.
* **User management** — add, edit, delete, and retrieve FS PBX users.
* **Extension limit updates** — set the maximum number of extensions
  allowed on a tenant.
* **Destination management** — create and update FS PBX destinations,
  including ring groups.

Requirements
============

* WHMCS 8.13.x or WHMCS v9.
* ictVoIP Billing addon v1.5.0+.
* FS PBX server module installed on the WHMCS server.
* FS PBX API accessible over HTTPS from the WHMCS host.
* A dedicated FS PBX API user with tenant/domain management privileges.

Server Setup
============

1. In WHMCS, go to **Setup → Products/Services → Servers**.
2. Click **Add New Server**.
3. Select the FS PBX server module.
4. Enter the FS PBX host FQDN and API credentials.
5. Run the **Test Connection** to confirm the WHMCS IP is whitelisted
   and the API user is valid.
6. Save the server and link it to the desired ictVoIP Billing provider.

Client Services Workflows
=========================

The Client Services dashboard now supports both FusionPBX and FS PBX
backends. When a server is selected, the addon detects the provider
type and loads the correct forms and API actions:

* **Tenant Domains** — create or import FS PBX domains using the
  provider-aware workflow.
* **Extensions** — add and manage FS PBX extensions where supported.
* **Destinations** — manage FS PBX destinations and ring groups.
* **Users** — create, edit, delete, and list FS PBX tenant users.

Always run a **dry-run** before pushing FS PBX changes. The dry-run
preview shows the API actions that will be sent and the expected
result, allowing you to fix credentials or data before a live push.

Authentication
==============

FS PBX API requests require:

* A valid API integration user.
* An access hash or API token.
* The WHMCS host IP whitelisted on the FS PBX server.

If the connection test fails, verify the credentials and the IP
whitelist first. FS PBX may also require HTTPS with a valid SSL
certificate.

.. seealso::

   * :doc:`/admin/client_services` — provider-aware provisioning
     workflows.
   * :doc:`/admin/servers` — adding and testing PBX server
     connections.
   * :doc:`/admin/providers` — configuring providers and routing.
