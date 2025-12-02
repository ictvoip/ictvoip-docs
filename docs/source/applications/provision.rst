Provisioning Overview
=====================

Overview
--------

This guide provides a high-level overview of how ictVoIP Billing
interacts with supported PBX systems (such as FusionPBX and Vodia) to
provision tenants, gateways, extensions, and related resources. It is
intended for administrators who want to understand the end-to-end
provisioning flow rather than implementation details.

For PBX-specific details, see :doc:`/modules/fusionpbx` (FusionPBX
Integration) and :doc:`/modules/vodia` (Vodia Module).

Key Concepts
------------

* **Provider** – Represents a VoIP provider or PBX integration in ictVoIP Billing and is linked to tariffs and packages for billing.
* **Tenant / Domain** – Represents a customer or site in the PBX (for example, a FusionPBX domain) and is associated with one or more WHMCS services.
* **Gateway** – Connects a tenant to a VoIP provider or trunk and is managed by the PBX, with key details mirrored into ictVoIP Billing for monitoring and billing alignment.
* **Extensions** – Internal endpoints for a tenant (for example, SIP extensions) that are created and managed in the PBX, with lifecycle driven by WHMCS products and services.

Provisioning Flow (High-Level)
------------------------------

The exact flow depends on your PBX module, but a typical pattern for a
new customer is:

1. **Create or select a Provider** in ictVoIP Billing

   * Configure provider details and link the appropriate tariff.
   * See :doc:`/admin/providers` for provider and tariff configuration.

2. **Create or assign a Tenant Domain** in the PBX

   * For FusionPBX, this corresponds to a domain entry.
   * For other PBXs, the concept may differ but serves the same role.
   * Tenant limits and descriptions can be synchronized between WHMCS
     and the PBX using the relevant server module.

3. **Create WHMCS Products/Services** for VoIP Packages

   * Use WHMCS products to represent VoIP packages (for example,
     included minutes, number of extensions, or feature bundles).
   * Link products to the appropriate server module (for example,
     FusionPBX module).

4. **Provisioning on Order/Activation**

   When a client orders a service and it is activated:

   * The WHMCS server module calls the PBX APIs to:
     - Create or assign the tenant domain (if not already present).
     - Create or update extensions according to the service plan.
     - Associate gateways or trunks where required.
   * ictVoIP Billing mirrors key PBX data (domains, gateways,
     extensions) into its own tables for billing and management.

5. **Ongoing Changes**

   * Upgrading/downgrading a package may adjust:
     - Allowed number of extensions.
     - Assigned gateways or dialplan rules.
   * Suspending a service may:
     - Disable associated gateways or trunks.
     - Prevent further usage until re-activation.
   * Terminating a service may:
     - Remove or disable tenant resources in the PBX.

6. **Billing and CDRs**

   * PBX CDRs are imported into ictVoIP Billing for rating and
     invoicing.
   * Billing logic (standard or real-time) uses provider and tariff
     configuration to calculate charges.

Where to Configure What
------------------------

* **WHMCS**
  - Products, services, and billing cycles.
  - Client accounts and invoicing.

* **ictVoIP Billing Addon**
  - Providers and tariffs.
  - Server definitions for PBX hosts.
  - High-level provisioning preferences (per module).
  - Server provisioning settings for PBX hosts, including credentials and API access hashes, along with tools to test connectivity and IP whitelisting before enabling automated provisioning.

* **PBX (for example, FusionPBX)**
  - Actual domains/tenants.
  - Gateways, dialplans, and extensions.
  - Local security and network configuration.

For module-specific provisioning details and API usage, see the
relevant module documentation under :doc:`/modules/fusionpbx` and
:doc:`/modules/vodia`.

How Admin Tools Use This Flow
-----------------------------

The provisioning concepts in this overview are surfaced to
administrators through dedicated tools in the ictVoIP Billing addon:

* The **Client Services Admin Area** (:doc:`/admin/client_services`)
  provides a WHMCS-based dashboard for managing tenants/domains,
  gateways, extensions, destination routes, and related resources.
  Behind the scenes, it uses the same PBX APIs described in the module
  docs to apply changes to FusionPBX (or other PBXs) while keeping
  WHMCS services aligned.
* The **Autobill** system (:doc:`/admin/autobill`) consumes CDRs
  exported from the PBX and applies tariffs and package rules
  configured in Billing Management to turn call usage into
  billable charges.

Together, these tools allow you to provision PBX resources and bill
for usage from within WHMCS, while the low-level API and dialplan
logic remain on the PBX itself.
