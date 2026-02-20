************
ictVoIP Box
************

Overview
========

The **ictVoIP Box** addon is an optional front-facing provisioning
system for FusionPBX that runs through the WHMCS order process. It is
designed for scenarios where new or existing clients can purchase a PBX
package and have tenant domains, admin users, extensions, SIP trunking,
and basic routing created automatically.

ictVoIP Box integrates with the core **ictvoipbilling** addon and the
FusionPBX server modules so that the PBX side (tenants, extensions,
gateways, routes) and the billing side (services, CDRs, packages) stay
aligned.

|

 .. image:: ../_static/images/admin/ictvoipbox_mainv3.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box dashboard
        
|
High-Level Capabilities
=======================

At a high level, ictVoIP Box provides:

* **Automated PBX Onboarding** – Creates a FusionPBX tenant/domain,
  admin user, and a starter set of extensions as part of checkout.
* **Provider-Driven SIP Trunk Setup** – Uses provider credentials and
  templates to create a SIP trunk and map it to the new tenant.
* **Template-Based Routing** – Applies inbound and outbound route
  templates so that the main DID and basic outbound calling work out of
  the box.
* **Tight Integration with ictVoIP Billing** – Uses the same provider,
  gateway, and destination concepts as the Client Services Admin Area,
  so later administration can be done from the standard tools.

Typical Workflows
=================

New Client PBX Bundle
---------------------

In a typical new-customer scenario:

1. The client selects an ictVoIP Box-backed PBX product or bundle in
   your WHMCS order form.
2. During checkout, they provide key details such as tenant name,
   contact information, main DID, and seat count.
3. After payment, the order enters a pending state awaiting
   administrator review and approval.
4. An administrator reviews the order details and triggers the
   automated provisioning sequence (see
   :ref:`admin-controlled-provisioning`), which:
   
   * Creates the FusionPBX tenant/domain and admin user.
   * Creates a starter set of extensions and associates them with the
     tenant.
   * Provisions a SIP trunk using the configured provider templates.
   * Applies inbound and outbound route templates so calls can flow.
5. A welcome email is sent with the tenant login details and key
   service information.

Existing Client Purchase
------------------------

Existing WHMCS clients can also purchase ictVoIP Box-backed services:

1. The client logs into the WHMCS Client Area and places an order for a
   PBX package that uses ictVoIP Box automation.
2. The order enters a pending state for administrator review.
3. An administrator triggers the provisioning sequence (see
   :ref:`admin-controlled-provisioning`), creating or attaching a
   FusionPBX tenant and provisioning the trunk and routes.
4. The resulting tenant, gateway, and destination records are visible
   to administrators through the standard **Client Services Admin Area**
   (:doc:`/admin/client_services`).

Checkout Experience (4-Step Wizard)
-----------------------------------

From the client's perspective, ictVoIP Box presents a simple
four-step wizard during checkout. You can attach screenshots for each
step when documenting your own deployment.

1. **Company Details** – The client enters their company name and basic
   contact information to identify the new PBX tenant.
|

 .. image:: ../_static/images/clientarea/cart_ordering_1.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box dashboard
        
|
2. **DID Selection** – The client selects a main DID from the numbers
   you have made available, typically filtered by
   country/province/region, rate center, and specific number.

|

 .. image:: ../_static/images/clientarea/cart_ordering_2.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box dashboard
        
|
3. **Tenant & Extensions Preview** – A summary view shows the tenant
   hostname/domain that will be created and the maximum number of
   extensions or seats included with the chosen package.

|

 .. image:: ../_static/images/clientarea/cart_ordering_3.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box dashboard
        
|
4. **Create Admin User** – The final modal collects the admin user
   details for the new ictPBX tenant (assigned server and tenant
   domain, admin username/password, email, timezone, language, and
   group). When the client clicks **Create User & Complete Order**, the
   order is placed in a pending state for administrator review and
   provisioning (see :ref:`admin-controlled-provisioning`).

|

 .. image:: ../_static/images/clientarea/cart_ordering_4.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box dashboard
        
|

Admin Setup Checklist
=====================

Before exposing ictVoIP Box to customers, an administrator should:

1. **Install and activate required modules** – Ensure ictVoIP Billing
   and the relevant FusionPBX server modules are installed and
   activated in WHMCS.
2. **Configure core providers and servers** – Use the
   :doc:`/admin/providers` and :doc:`/admin/servers` pages to configure
   your upstream provider(s) and FusionPBX host(s), including API and
   whitelist settings.
3. **Review security and SSL/TLS** – Follow the
   :doc:`/getting_started/security` and :doc:`/getting_started/lets_encrypt`
   guides so that WHMCS and FusionPBX are reachable securely.
4. **Configure ictVoIP Box providers** – Within the ictVoIP Box addon,
   define which upstream provider account(s) will be used for automatic
   trunk creation and what defaults (routing, codecs, etc.) should
   apply.
5. **Configure gateway and route templates** – Choose default gateway
   and route templates that describe how trunks and dialplans should be
   created for new tenants.
6. **Create PBX products/bundles** – Create one or more WHMCS products
   that use ictVoIP Box automation for PBX onboarding. Associate
   appropriate welcome emails and pricing.

Once this one-time setup is complete, the ictVoIP Box screens can be
used to adjust providers and templates over time without changing the
overall flow.

Dashboard & Provider Configuration
=================================

From the WHMCS admin area, navigate to **Addons → ictVoIP Box** to open
the main dashboard.

|

 .. image:: ../_static/images/admin/ictvoipbox_mainv3.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box dashboard
        
|

Use the **Providers** tab to register the upstream provider account
that will be used for automated trunk creation and routing defaults.

Typical steps:

1. Select the provider you want to manage.
2. Enter or review the provider connection details and any default
   routing or codec options.
3. Save changes so they are available to the automation flow.

|

 .. image:: ../_static/images/admin/ictvoipbox_provider_setting.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box provider settings
        
|

Checkout API Settings
=====================

The **Checkout / API Settings** area lets you control which countries
and options are available when clients order PBX services via ictVoIP
Box.

Typical uses:

* Restrict which countries or number types can be ordered.
* Define defaults that will be applied when new trunks and routes are
  created during checkout.
* Control how DIDs are provisioned for a given provider during the
  ordering process, such as using a **sandbox / test mode** for lab and
  staging orders or enabling **automatic DID activation** on checkout
  for production flows.

|

 .. image:: ../_static/images/admin/ictvoipbox_api_settings.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box checkout API settings
        
|

Bundled Product Setup (Max Seats)
---------------------------------

Before you can effectively use **Product Mapping**, you should first
create one or more WHMCS **bundled products** that define how many
seats (extensions) are included with each PBX offer.

|

 .. image:: ../_static/images/admin/product_module_settings.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box provider settings
        
|

At a high level:

* **Create a WHMCS product bundle** that represents your PBX offer
  (for example, ``PBX Starter – Up to 10 Seats``).
* Include one or more **seat-related products** in the bundle whose
  quantities will represent the maximum seats. For example, a
  ``PBX Seat`` product where the quantity allowed in the bundle
  determines the Max Seats shown in the checkout wizard.
* Once the bundle and its seat products are configured, go back to the
  ictVoIP Box **Product Mapping** screen and map that bundle to the
  appropriate provider, gateway template, and route templates.

When a client orders the bundle, ictVoIP Box reads the mapped bundle
and its included products to determine the **Max Seats** value
presented on Step 3 of the checkout wizard (Tenant & Extensions
Preview).

After your own product naming and bundle structure in WHMCS are
finalized, you can optionally add internal notes or screenshots showing
the WHMCS bundle configuration side-by-side with the corresponding
ictVoIP Box Product Mapping entry.

Product Mapping
===============

ictVoIP Box uses **product mapping** to decide which WHMCS products (or
bundles) should trigger automated PBX provisioning.

In this area you can:

* Map specific PBX products or bundles to an ictVoIP Box provider and
  template set.
* Control which products participate in the guided checkout experience.

|

 .. image:: ../_static/images/admin/ictvoipbox_prod_mapping.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box product mapping
        
|


Route Template Assignments
==========================

Route templates define how inbound and outbound call routing should be
created for new tenants.

Typical configuration steps:

1. Navigate to **Addons → ictVoIP Box → Route Templates**.
2. Review available inbound and outbound templates provided by
   ictVoIP Billing.
3. Select a default inbound route template for each provider (for main
   DID routing to the correct extension or tenant).
4. Select a default outbound route template for each provider (for
   standard outbound calling patterns).

|

 .. image:: ../_static/images/admin/ictvoipbox_template_routes.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box route templates
        
|

Gateway Template Assignments
============================

Gateway templates describe how the PBX trunk should be created for each
new tenant. ictVoIP Box uses these templates during provisioning to
populate trunk details based on the provider configuration and the
customer order.

Typical configuration steps:

1. Navigate to **Addons → ictVoIP Box → Gateway Templates**.
2. Review the available templates shared with ictVoIP Billing.
3. Choose a default gateway template per provider that reflects your
   desired trunk settings.

|

 .. image:: ../_static/images/admin/ictvoipbox_templates_gateway.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box gateway templates
        
|

.. _admin-controlled-provisioning:

Admin-Controlled Provisioning
==============================

ictVoIP Box now provides **admin-controlled provisioning** that gives
administrators time to review and verify orders before executing the
complete provisioning sequence. This replaces the previous automatic
client-side provisioning and provides greater control over the
deployment process.

Provisioning Workflow
---------------------

When a client completes an order through the ictVoIP Box checkout
wizard, the order is placed in a **pending provisioning** state rather
than being automatically provisioned. Administrators can then:

1. **Review the order** – Verify client details, selected DID, tenant
   configuration, and admin user information.
2. **Confirm provisioning** – Once verified, trigger the automated
   provisioning sequence from the admin dashboard.
3. **Monitor progress** – Watch real-time provisioning status as the
   system creates the tenant, provisions DIDs and trunks, configures
   gateways, and sets up routing.

This approach ensures that:

* Orders are validated before resources are consumed
* Administrators can catch configuration issues early
* Provisioning can be scheduled during appropriate maintenance windows
* Complete audit trail is maintained for compliance

Provisioning Methods
--------------------

ictVoIP Box supports **three provisioning methods**, all controlled by
administrators:

**1. Client Portal Orders**
   Clients place orders through the WHMCS client area using the 4-step
   checkout wizard. Orders enter pending state and await admin approval
   before provisioning.

**2. Admin Order Placement**
   Administrators can place orders directly from the WHMCS admin area
   on behalf of clients, with immediate access to provisioning controls.

**3. Admin Impersonation**
   Administrators can impersonate a client account to place orders with
   the client's context, useful for quick turnaround provisioning or
   assisted onboarding.

All three methods result in the same automated provisioning sequence
once the administrator confirms the order.

Live Provisioning Process
--------------------------

When an administrator triggers provisioning, the system executes a
comprehensive automation sequence that typically completes in **under 3
minutes**:

|

 .. image:: ../_static/images/admin/Provisioning.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box live provisioning
        
|

The provisioning sequence includes:

**Provider Provisioning:**
   * Real-time DID search and availability check
   * Automatic DID ordering with the upstream provider
   * SIP trunk creation and credential generation

**ictVoIP Billing Integration:**
   * Automatic service creation in WHMCS
   * Invoice generation with proper billing rates
   * CDR collection setup for usage tracking
   * Billing sync with provider tariff rates (metered or real-time)

**FusionPBX Provisioning:**
   * Tenant/domain creation on designated FusionPBX server
   * Admin user account creation with credentials
   * Gateway configuration with SIP registration details
   * Inbound/outbound routing and dialplan creation
   * Extension provisioning based on package seat count

**Completion:**
   * Welcome email sent to client with all credentials
   * Service marked as active in WHMCS
   * Client can immediately begin making and receiving calls

|

 .. image:: ../_static/images/admin/welcomemail.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Box welcome email
        
|

This complete three-way integration (Provider → ictVoIP Billing →
FusionPBX) ensures that all systems remain synchronized and the client
receives a fully functional PBX service without manual intervention.

Next Steps
==========

After ictVoIP Box has been configured and customers begin ordering PBX
packages, day-to-day administration of tenants, extensions, gateways,
and routes is typically handled from the **Client Services Admin Area**
(:doc:`/admin/client_services`) and the FusionPBX module pages. ictVoIP
Box focuses on providing a smooth, automated onboarding flow at the
time of purchase.
