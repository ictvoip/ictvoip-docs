**********************
Provider Configuration
**********************

.. _provider-settings:

Provider Settings
=================

Navigate to **Addons → ictVoIP Box → Provider Settings**.

This tab is where you configure and manage the API credentials and behaviour for each provider that ictVoIP Box uses for ordering and provisioning. ictVoIP Box supports multiple providers, and each provider's settings are independent and should be tested after saving.

API credentials are stored encrypted. When you open an existing provider, the password or API key field is intentionally left blank. Leave the field blank to keep the stored credential, or enter a new value only when you want to change it.

VoIP.ms credentials
-------------------

* **API Username** — the email address used to log in to the VoIP.ms customer portal.
* **API Password** — the SOAP & REST/JSON API password from the VoIP.ms portal. This is separate from your customer portal password and is stored encrypted.
* **Account Number** — the main VoIP.ms account number, for example ``190312``.
* **SIP Server** — a white-label SIP server hostname that is shown to customers, for example ``sip.ictvoip.ca``.
* **Canada Routing** — the VoIP.ms routing option for Canadian destinations:

  * ``1`` — Standard/Economy (recommended)
  * ``2`` — Premium Quality

* **International Route** — the VoIP.ms routing option for international destinations:

  * ``1`` — Standard/Economy (recommended)
  * ``2`` — Premium Quality

* **Default Caller ID** — an optional default outbound caller ID. If left empty, the main DID is used.

DIDWW credentials
-----------------

* **API Key** — the DIDWW API key from **DIDWW Control Panel → API → Keys**. The key is stored encrypted and the field is left blank on edit; leave it blank to keep the existing key.
* **Sandbox Mode** — when enabled, ictVoIP Box uses the DIDWW sandbox API endpoint for testing without charges.
* **Sandbox Portal URL** — the DIDWW control panel URL for the sandbox environment.
* **Production Portal URL** — the DIDWW control panel URL for the production environment.
* **Default Voice In Trunk ID** — the DIDWW Voice In Trunk that new DIDs should be routed to. The trunk must be created in the DIDWW portal before ordering DIDs.

Saving a new provider
---------------------

When you create a new provider, the API password or API key is required. After you save, the credentials are encrypted and the field is cleared so the value is no longer visible on the form. To update a credential later, enter the new value and save again.

Gateway Templates
=================


.. contents::
   :local:
   :depth: 2

Overview
--------

Navigate to **Addons → ictVoIP Box → Gateway Templates** tab.

The Gateway Templates tab lets you map a default gateway template to each configured provider. When an order is completed, the provider's client API provisions the corresponding peer account or trunk on the provider side (for example, a DIDWW trunk or a VoIP.ms peer). ictVoIP Box then uses the mapped template to provision the matching gateway in FusionPBX so the tenant's calls can route through that account or trunk.

**Where gateway templates come from**

Gateway templates are created and maintained in the ictVoIP Billing addon. To manage them, go to **Addons → ictVoIP Billing → Gateways → Templates**. These templates define the SIP gateway configuration that FusionPBX will use for provider trunks (for example, DIDWW or VoIP.ms).

**Verify before assigning**

Before you assign a gateway template to a provider in ictVoIP Box, confirm that the template has been tested and is working through a real FusionPBX provisioned gateway. A template that has not been verified can cause inbound or outbound call failures because the wrong trunk settings, authentication, or codec profile will be applied to the provisioned tenant.

What the Template Controls
~~~~~~~~~~~~~~~~~~~~~~~~~~

A gateway template does not clone an entire FusionPBX gateway. During ictVoIP Box provisioning, the template's ``provision.gateway`` values are merged with the provider-specific values that the ictVoIP Box provisioning workflow resolves. The final FusionPBX gateway is created from the following fields:

* **gateway** — the system name of the gateway in FusionPBX
* **username** — SIP authentication username
* **password** — SIP authentication password
* **from_user** — optional From: user
* **from_domain** — optional From: domain
* **proxy** — SIP proxy/host
* **realm** — SIP realm/domain
* **expire_seconds** — registration expiry interval
* **retry_seconds** — retry interval on failed registration
* **context** — FusionPBX dialplan context
* **profile** — SIP profile to use
* **register** — whether to register with the provider
* **enabled** — whether the gateway is active
* **description** — human-readable description

For **DIDWW** orders, ictVoIP Box first provisions the DIDWW voice-out trunk. Once the trunk has been created, DIDWW replies with the trunk credentials and settings. ictVoIP Box then fetches those values and uses them for the FusionPBX gateway. The following values are resolved from the newly provisioned trunk:

* **gateway** — generated from the tenant domain FQDN (for example, ``tenant.example.com-trunkDIDWW``)
* **username** — the username that DIDWW generated for the voice-out trunk
* **password** — the password that DIDWW generated for the voice-out trunk; these are per-trunk credentials and are not reused across orders
* **from_user** — the same as the username
* **description** — the tenant domain FQDN

The remaining fields — **proxy**, **realm**, **from_domain**, **profile**, **expire_seconds**, **retry_seconds**, **register**, **enabled**, and **context** — are taken from the assigned gateway template, with sensible defaults applied if the template does not provide them (for example, ``register`` and ``enabled`` default to ``true``, ``context`` defaults to ``public``).

For **VoIP.ms** orders, ictVoIP Box creates a VoIP.ms subaccount for the order and resolves the following values from that subaccount:

* **gateway** — generated from the tenant domain FQDN (for example, ``tenant.example.com-trunk``)
* **username** — the auto-generated VoIP.ms subaccount username
* **password** — the auto-generated VoIP.ms subaccount password; these are per-order credentials and are not reused across orders
* **from_user** — the same as the subaccount username
* **from_domain** — the tenant domain FQDN
* **description** — the tenant domain FQDN

For other providers, the same FusionPBX field names are used. The difference is the source of the provider-specific values (SIP host, POP, account/subaccount, and credentials). The assigned template must still provide any fields that the provider workflow does not resolve automatically.

Assigning Templates to Providers
---------------------------------

1. Open **Addons → ictVoIP Box → Gateway Templates**.
2. For each provider in the mapping table, select the desired template from the **Selected Gateway Template** dropdown.
3. Review the **Current** column to see which template is already saved for each provider.
4. Click **Save Template Mappings**.

The **Available Gateway Templates** table below the mapping form shows the templates that ictVoIP Billing has made available, including the template ID, name, display name, and the provider it belongs to (or ``Global`` if it is not restricted to a provider).

Best Practices
--------------

* **Test in FusionPBX first** — provision a test gateway with the template before selecting it in ictVoIP Box.
* **Match the provider** — choose a template that matches the SIP registration and authentication requirements of the selected provider (for example, DIDWW vs VoIP.ms).
* **Use one default per provider** — each provider should have exactly one default gateway template mapped.
* **Review after provider changes** — if you change provider credentials or trunk settings, re-test and re-select the gateway template as needed.

Route Templates
===============

Navigate to **Addons → ictVoIP Box → Route/Destination Templates**.

The Route Templates tab lets you assign a default **inbound** and **outbound** route template to each provider. During tenant provisioning, the selected route templates are applied to the new tenant so incoming calls to the DID and outgoing calls from the tenant follow the correct dialplan and gateway routing.

Where the templates come from
-----------------------------

Route templates are created and tested in the ictVoIP Billing addon. They are not created in ictVoIP Box.

* **Inbound route templates** are managed at **Addons → ictVoIP Billing → Destinations → Inbound Templates**.
* **Outbound route templates** are managed at **Addons → ictVoIP Billing → Destinations → Outbound Templates**.

These templates define dialplan expressions, destination actions, and other routing behaviour that FusionPBX uses for the tenant.

Verify in ictVoIP Billing before applying
-----------------------------------------

Because a bad route template can break all inbound or outbound calling for a tenant, the templates must be tested and verified in ictVoIP Billing **before** they are selected in ictVoIP Box. Once a template is known to work, it can be mapped to the provider.

Assigning route templates to providers
--------------------------------------

1. Open **Addons → ictVoIP Box → Route/Destination Templates**.
2. For each provider, select the **inbound route template** from the dropdown in the **Inbound Route Templates** table.
3. For each provider, select the **outbound route template** from the dropdown in the **Outbound Route Templates** table.
4. Review the **Current** column to confirm which template is already saved for each provider.
5. Click **Save Route Template Mappings**.

The **Available Inbound Route Templates** and **Available Outbound Route Templates** tables below the mapping form show the templates that ictVoIP Billing has made available. If a template is missing, create or import it in ictVoIP Billing first and verify it works before assigning it here.

Best Practices
--------------

* **Verify in ictVoIP Billing first** — test inbound and outbound calls through the template before selecting it in ictVoIP Box.
* **Match the provider** — inbound templates often differ from outbound templates; choose ones that match the provider's DID and routing requirements.
* **Use one default per route type and provider** — each provider should have exactly one default inbound template and one default outbound template.
* **Review after template changes** — if you edit a template in ictVoIP Billing, re-test the affected orders and re-save the mapping if needed.

ACLs
====

Navigate to **Addons → ictVoIP Box → ACLs**.

The ACLs tab is used to create reusable **access control list (ACL) templates** and assign them to specific FusionPBX tenant domains. An ACL template contains a set of IP address rules that restrict which source addresses are permitted to send traffic to the tenant.

This tab is optional and is not required for normal provisioning. It is intended for administrators who need to apply custom network restrictions after a tenant has been created.

Creating an ACL template
------------------------

1. Choose the provider the template belongs to.
2. Enter a descriptive **Name**.
3. Enter the **Rules** as a JSON array of CIDR blocks, for example ``["10.0.0.0/8", "172.16.0.0/12"]``.
4. Click **Add/Save**.

Assigning an ACL
----------------

1. Click **Assign** next to the desired ACL template.
2. Select the target **FusionPBX server**.
3. Enter the **Tenant Domain** the ACL should apply to.
4. Enter an optional **Service ID** if the ACL should be scoped to a specific service.
5. Click **Assign**.

DID Search
==========

Navigate to **Addons → ictVoIP Box → DID Search**.

The DID Search tab is a provider-aware tool for looking up available phone numbers. It uses the selected provider's API and is useful for both finding inventory and confirming that the provider API is responding correctly.

What it shows
-------------

The page switches based on the selected provider:

* **DIDWW** — a global search by country, region/province, and city or rate center.
* **VoIP.ms** — separate North America (Canada/USA) and international search sections.

For each search, the tab returns the provider's live API results: available DIDs, rate centers, and any provider-specific status messages. Because these are live lookups, the DID Search tab also doubles as a quick API connectivity test.

How to use it
-------------

1. Select the provider you want to search from the provider selector.
2. Choose the **country**, then the **region/province** and **city/rate center**.
3. Click **Search DIDs** (or the provider-specific search button).
4. Review the results returned from the provider's API.

If the search returns no results or an error, check the provider credentials and sandbox/production setting before using the same provider in the client checkout.

Settings
========

Navigate to **Addons → ictVoIP Box → Settings** (also labelled **Checkout & API Configuration**).

All settings in this tab are stored **per provider**. This means each provider can have its own default FusionPBX server, checkout filters, DID purchase options, and API timeout values. Use the provider selector at the top of the page to switch between providers before changing any values.

Default FusionPBX Server
------------------------

The default FusionPBX server is used for new orders when the checkout process or provisioning does not override it.

1. Select the desired FusionPBX server from the dropdown.
2. Click **Save Default Server**.

If a per-provider default is not set, the system falls back to the global addon default.

.. note::
   Inactive servers are shown with an `[Inactive]` label. This is a WHMCS display limitation and does not mean the server cannot be used. If the FusionPBX server is configured correctly and reachable, it may still be selected.

Checkout Filters
----------------

Checkout filters control what the client sees and can select during the order process.

* **Available Countries** — click countries from the provider's API list to add them to the checkout. Clients can only select from the chosen countries.
* **Available Province/State** — enter a comma-separated or single province/state code (for example ``ON`` or ``FL``). Leave empty to allow all.
* **DID Monthly Rate** — optional override for the monthly cost **displayed** in the checkout form. When a value is entered, the checkout form shows this amount instead of the provider's live price. Leave empty to use the provider's pricing.
* **DID Setup Cost** — optional override for the setup cost **displayed** in the checkout form. When a value is entered, the checkout form shows this amount instead of the provider's setup price. Leave empty to use the provider's pricing.

.. note::
   The checkout form labels the displayed amount as **CAD** for example purposes only. The value shown uses the WHMCS default currency. These fields only affect the price displayed during DID selection; they do **not** change the actual WHMCS product or order total. The WHMCS product configuration still controls the amount invoiced to the client.
* **Maximum DIDs per Customer** — the highest number of DIDs a single customer may order (default ``10``).
* **First DID is free** — the first selected DID is billed at ``0`` for the monthly rate.
* **Auto-assign DID** — the checkout process pre-selects a DID automatically when this is enabled.
* **Require DID selection** — the client must select a DID before completing checkout.

VoIP.ms DID Purchase Options
----------------------------

These options are shown for VoIP.ms providers.

* **Enable Auto-Purchase** — when enabled, the system automatically purchases the selected DID from VoIP.ms after checkout.
* **Test Mode** — the purchase call is executed in test/sandbox mode. No real purchase or charge occurs.
* **Billing Type** — choose **Per Minute Plan** or **Flat Rate Plan** for the purchased DID.
* **VoIP.ms POP** — the Point of Presence the purchased DID is assigned to. This must match the POP used by the FusionPBX gateway for the provider.

For DIDWW providers, the DID purchase options are replaced by a message explaining that DIDs are ordered and routed through the configured Voice In Trunk. The default Voice In Trunk is configured in the **Provider Settings** tab.

API Timeout Values
------------------

API timeout values are per provider and help prevent checkout or provisioning failures when the provider API is slow.

**DIDWW** uses a single timeout:

* **API Timeout (All Operations)** — default ``30`` seconds. Applies to DID search, order, and configuration calls.

**VoIP.ms** uses four separate timeouts:

* **MOH Timeout** — default ``10`` seconds. Used for ``getMusicOnHold()`` calls.
* **Check Sub-Account Timeout** — default ``30`` seconds. Used for collision detection before creating a subaccount.
* **Create Sub-Account Timeout** — default ``30`` seconds. Used during checkout provisioning when the subaccount is created.
* **General Timeout** — default ``30`` seconds. Used for all other VoIP.ms API operations.

If orders or searches fail with timeout errors, raise the relevant timeout by a small amount (for example, ``60`` seconds) and re-test. Higher values increase reliability but make the checkout slower.

Health Check
============

Navigate to **Addons → ictVoIP Box → Health Check**.

The Health Check tab runs a built-in diagnostic report that gathers information about the WHMCS environment, PHP and ionCube compatibility, WHMCS settings, FusionPBX servers, ictVoIP Box products and provider mappings, and installed addon modules. It is a support and troubleshooting tool, not a configuration screen.

What it checks
--------------

The report covers, but is not limited to:

* **Environment** — PHP version, ionCube Loader version, WHMCS version, and path checks.
* **WHMCS General Settings** — general, localization, and ordering settings that can affect checkout.
* **PHP Compatibility** — whether module files are compatible with the current PHP/ionCube combination.
* **Theme Output Checks** — whether the active theme outputs variables correctly.
* **Required Files** — whether expected files are present.
* **Product Groups and ictVoIP-Related Products** — product configurations, order form templates, provider mappings, and server types.
* **FusionPBX Servers** — registered FusionPBX servers and their active status.
* **Addon and Server Modules** — installed modules and whether their directories exist.
* **Cart Hook Interference** — any third-party hooks that may conflict with the ictVoIP Box cart.

Using the report for support
----------------------------

If you experience an issue with ictVoIP Box, open the **Health Check** tab and use the **Export** options to download the report in CSV or PDF format. Review the report for obvious problems (for example, a missing FusionPBX server, an inactive provider, or a product group without the correct order form template).

Before opening a ticket or bug report, run the Health Check and attach the exported report to your support request. ictVoIP Canada support uses this report to identify the environment and reproduce the problem faster.

DID Purchase Cron
=================

When a client selects a VoIP.ms DID during checkout, ictVoIP Box can queue the DID for purchase and complete the purchase through a scheduled cron job. This prevents API timeouts during the checkout process and allows purchases to be retried if the VoIP.ms API is temporarily unavailable.

Requirements
------------

* The provider must be a **VoIP.ms** provider.
* **Enable Auto-Purchase** must be turned on in the provider's **Settings** tab.
* The provider must have valid VoIP.ms API credentials.
* The cron file must be scheduled to run at regular intervals.

How it works
------------

1. During checkout, the client selects a DID number.
2. The order is saved with the DID in a pending-purchase state.
3. The **DID Purchase Cron** runs and queries all pending DIDs for each active VoIP.ms provider.
4. For each pending DID, the cron calls the VoIP.ms API to purchase the number using the provider's configured POP, billing type, and test mode setting.
5. Successful purchases are marked as active; failures are logged and retried up to five times, with a 10-minute delay between retries.

Scheduling the cron
-------------------

Run the cron file at the command line or schedule it through your server's cron system. A common interval is every 5 or 10 minutes.

Example cron entry (every 5 minutes):

.. code-block:: bash

   */5 * * * * /usr/bin/php /path/to/whmcs/modules/addons/ictvoipbox/cron/did_purchase.php >/dev/null 2>&1

.. note::
   Replace ``/path/to/whmcs`` with the full path to your WHMCS installation.

Provider and regulated-DID scope
--------------------------------

The DID Purchase Cron is for **VoIP.ms providers only**. It does **not** purchase DIDs from DIDWW or any other provider, and it does **not** handle regulated-country DIDs. DIDWW orders and any DID that requires regulatory documentation must still be processed through the admin provisioning queue.

Test mode
---------

When **Test Mode** is enabled in the provider's **Settings** tab, the cron runs the purchase call against the VoIP.ms API but does not create a real order or charge the account. This is useful for validating the integration before enabling live purchases.

Logs
----

The cron writes to ``modules/addons/ictvoipbox/storage/logs/did_purchase_cron.log``. Review this log if a DID is not being purchased or if the cron is reporting API errors.

Multi-Provider Support
======================

ictVoIP Box supports more than one provider at a time. Providers are independent from one another, so each one can have its own type, API credentials, gateway templates, route templates, cart settings, and product mappings.

Supported provider types
------------------------

* **VoIP.ms** — North American and international DIDs with sub-account provisioning.
* **DIDWW** — global DIDs with Voice In/Voice OUT trunk provisioning.

How providers are managed
-------------------------

1. Open **Addons → ictVoIP Box → Dashboard**.
2. Use the **Select Provider** dropdown in the left-hand **Providers** card to choose the provider you want to work with.
3. Click **Manage** to open the selected provider in the :ref:`provider-settings` tab, **New** to create a provider, or **Delete** to remove the selected provider.
4. When creating a new provider, choose the **Provider Type** and enter a friendly **Provider Name**, then fill in the API credentials and provider-specific settings and save.

Product and checkout mapping
----------------------------

Products in WHMCS are mapped to a specific provider on the :doc:`product_mapping` tab. When a client orders a product, the mapped provider is used for DID search, purchase, and FusionPBX provisioning. Each product can point to only one provider.

Switching between providers
---------------------------

The active provider is selected on the **Dashboard**. Most other ictVoIP Box tabs are provider-aware and display the currently selected provider at the top of the page. To work on a different provider, return to the **Dashboard**, select it from the **Providers** card, then click **Manage**. Remember to save changes in any tab before switching providers or the unsaved changes will be lost.

Deleting a provider
-------------------

A provider can only be deleted if it is not in use. The delete action is blocked if the provider still has:

* Purchased DIDs
* Pending DIDWW orders
* Provisioning orders
* Product mappings

If a delete is blocked, reassign or remove those references first, then delete the provider.

Advanced Provider Credential Fields
===================================

All advanced provider credential and routing fields are configured in the :ref:`provider-settings` tab. See the VoIP.ms and DIDWW credential sections for details on ``sip_server``, ``canada_routing``, ``international_route``, ``default_caller_id``, ``default_trunk_id``, and the DIDWW sandbox and production portal URLs.

Client Access Setting
=====================

The **Client Access** setting is configured when the ictVoIP Box module is activated in WHMCS. It controls whether clients can access the client-facing ictVoIP Box pages.

* **Enabled (default)** — clients can use the ictVoIP Box provisioning form and any client-side features that the addon provides.
* **Disabled** — client access is turned off. Only administrators can use the addon pages.

To change this setting, go to **Setup → Addon Modules**, locate **ictVoIP Box**, and click **Configure**. Set **Client Access** to **Yes** or **No** and save.

Welcome Email Template
======================

When ictVoIP Box successfully provisions a tenant, it triggers a welcome email to the client. The expected email template names are ``ictvoip_welcome`` or ``ictvoipbox_welcome``.

Template source file
--------------------

A sample template file is included with the ictVoIP Box package:

* ``resources/emails/email_template_ictvoip_welcome.tpl`` — the HTML body of the welcome email.
* ``resources/emails/ICTVOIP_WELCOME_EMAIL_SETUP.md`` — the setup instructions and merge-field reference.

ictVoIP Box does not import the template into WHMCS automatically on activation. The template must be created or imported manually as described below.

Creating the template in WHMCS
------------------------------

1. Go to **Setup → Email Templates** in WHMCS.
2. Click **Create New Email Template**.
3. Enter the following:

   * **Unique Name** — ``ictvoip_welcome`` (or ``ictvoipbox_welcome``)
   * **Type** — ``Product/Service``
   * **Subject** — your own subject line, for example ``Welcome - Your ictVoIP PBX Service is Ready!``

4. Copy the HTML body from ``resources/emails/email_template_ictvoip_welcome.tpl`` into the email body.
5. Save the template.
6. ictVoIP Box will automatically trigger this template against the product/service after provisioning completes.

Alternatively, you can import the template directly into the ``tblemailtemplates`` database table using the SQL example in ``ICTVOIP_WELCOME_EMAIL_SETUP.md``.

Merge fields
------------

The following merge fields are populated by ictVoIP Box and can be used in the email body:

* ``{$tenant_domain}`` — the tenant's FusionPBX domain FQDN, for example ``tenant.wat4.ictvoip.ca``.
* ``{$fusionpbx_hostname}`` — the hostname of the FusionPBX server the tenant was created on.
* ``{$admin_username}`` — the FusionPBX admin username for the tenant.
* ``{$admin_password}`` — the FusionPBX admin password for the tenant.
* ``{$admin_email}`` — the email address configured for the FusionPBX admin user.
* ``{$main_did}`` — the main DID assigned to the tenant, or ``Not Assigned`` if no DID was selected.
* ``{$extensions}`` — an HTML table of the auto-created extensions, including extension number, caller ID name, and password. Place the variable inside the HTML source as appropriate for your template format.

The following standard WHMCS merge fields are also commonly used in the sample template:

* ``{$client_name}`` — the client's full name.
* ``{$company_name}`` — your WHMCS company name.
* ``{$service_id}`` — the WHMCS service ID.
* ``{$service_product_name}`` — the ordered product name.
* ``{$service_domain}`` — the service domain.
* ``{$whmcs_url}`` — the WHMCS client area URL.

Security note
-------------

The welcome email contains the tenant admin password and extension passwords in plain text. Send this email only to the authorized client contact. Instruct the client to change the FusionPBX admin password and any extension passwords as soon as possible.

