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
3. After payment, ictVoIP Box runs an automated provisioning flow that:
   
   * Creates the FusionPBX tenant/domain and admin user.
   * Creates a starter set of extensions and associates them with the
     tenant.
   * Provisions a SIP trunk using the configured provider templates.
   * Applies inbound and outbound route templates so calls can flow.
4. A welcome email is sent with the tenant login details and key
   service information.

Existing Client Purchase
------------------------

Existing WHMCS clients can also purchase ictVoIP Box-backed services:

1. The client logs into the WHMCS Client Area and places an order for a
   PBX package that uses ictVoIP Box automation.
2. The same provisioning flow runs behind the scenes, creating or
   attaching a FusionPBX tenant and provisioning the trunk and routes.
3. The resulting tenant, gateway, and destination records are visible
   to administrators through the standard **Client Services Admin Area**
   (:doc:`/admin/client_services`).

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

 .. image:: ../_static/images/admin/ictvoipbox_main.png
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

Next Steps
==========

After ictVoIP Box has been configured and customers begin ordering PBX
packages, day-to-day administration of tenants, extensions, gateways,
and routes is typically handled from the **Client Services Admin Area**
(:doc:`/admin/client_services`) and the FusionPBX module pages. ictVoIP
Box focuses on providing a smooth, automated onboarding flow at the
time of purchase.
