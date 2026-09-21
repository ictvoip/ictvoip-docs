Admin Quick Start
*****************

This guide walks a new administrator through the first post-install
configuration of ictVoIP Billing. It assumes the addon is already
installed, activated, and the system health check has passed.

Before You Begin
================

.. important::

   Have the following ready before you start:

   * A valid ictVoIP Billing license key.
   * Your provider API or trunk credentials (VoIP.ms, DIDWW, etc.).
   * The FusionPBX, FS PBX, or Vodia server hostname and an admin-level
     access hash or API user.
   * Your WHMCS server IP whitelisted on the provider and/or PBX.

Step 1: Add a Provider
======================

1. In WHMCS admin, open **ictVoIP Billing → Providers**.
2. Click **Add Provider**.
3. Select the provider type (for example, VoIP.ms or DIDWW).
4. Enter the provider name and the API credentials.
5. Save and test the connection if a test button is available.

A provider is the source of call routing, DIDs, and trunk billing. If
you are using both FusionPBX and FS PBX, create a separate provider
for each PBX platform. See :doc:`/admin/providers` for advanced
configuration.

Step 2: Add a PBX Server
========================

1. Go to **Setup → Products/Services → Servers** and click **Add New
   Server**.
2. Select the server module that matches your PBX (for example,
   FusionPBX, FS PBX, or Vodia).
3. Enter the PBX hostname, access hash, and any required credentials.
4. Save and run the server connectivity test.

A working server connection is required before Client Services can
provision or sync tenants. See :doc:`/admin/servers`.

Step 3: Create a Package
========================

1. Open **ictVoIP Billing → Packages**.
2. Click **Add Package** and link it to the provider from Step 1.
3. Set the country code, tariff, free minutes, and markup.
4. Enable any optional features such as Special Number Billing or
   inbound minute tracking.
5. Save the package.

Packages define how client CDRs are rated and billed. See
:doc:`/admin/packages`.

Step 4: Create a Client Product
===============================

1. In WHMCS admin, create a product that uses the server module from
   Step 2.
2. Assign the package from Step 3 to the product.
3. Add the required product custom fields, such as:

   * ``Sub-Acct/Username``
   * ``DID`` or ``DID(s) Attached to Sub-Acct``
   * ``Server/Domain``

4. Save the product.

See :doc:`/clientadmin/clientadmin` for product and client
provisioning notes.

Step 5: Provision the Client Service
====================================

1. Open **ictVoIP Billing → Client Services**.
2. Select the provider/PBX and the client’s tenant.
3. Create or import the tenant domain.
4. Provision extensions and configure gateways.
5. Run a dry-run before pushing changes to the PBX.

See :doc:`/admin/client_services` for details on each Client Services
tool.

Step 6: Set Up Autobill
=======================

1. Open **ictVoIP Billing → Billing Management** or run the chosen
   autobill script directly in the browser.
2. Test Autobill v2 (separate invoices) or v3 (consolidated invoice)
   for one client first.
3. Review the generated invoice, rates, and totals.
4. When ready, add the corresponding CRON entry to run daily before the
   WHMCS daily CRON.

See :doc:`/admin/autobill` for CRON examples and troubleshooting.

Step 7: Go Live
===============

1. Verify a full WHMCS daily CRON cycle after the autobill CRON has run.
2. Confirm invoices are generated on the correct due dates.
3. Ask the client to review their first CDR view in the client area.

Common First-Time Issues
========================

* **Provider test fails** — verify the API credentials and that the
  WHMCS IP is whitelisted.
* **PBX server test fails** — confirm the access hash, HTTPS, and
  firewall rules.
* **CDRs are not billing** — check that the package country code and
  tariff match the CDR number format.
* **Autobill does not run** — make sure the CRON is scheduled before
  the WHMCS daily CRON and uses the correct timezone.
