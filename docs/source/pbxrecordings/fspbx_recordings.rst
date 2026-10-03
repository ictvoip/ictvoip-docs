FS PBX Call Recordings
**********************

The **ictVoIP FS PBX Call Recordings** server module lets clients
browse, play, and download call recordings hosted on their **FS PBX**
system, directly from the WHMCS client area. Recording audio stays on
the PBX host — it is fetched on demand when a client plays or downloads
it, never copied to WHMCS.

The module is part of the ictVoIP Billing ecosystem: it is implemented,
billed, and tracked through the **Product → Server → Provider →
Package → Client** chain in the ictVoIP Billing addon, alongside your
FS PBX voice services. Recordings are tenant-scoped — the client sees
recordings for the extensions assigned to their Call Recordings
service, with a per-extension column and filtering in the panel.

.. note::

   For the VoIP.ms-based recordings module, see
   :doc:`/voiprecordings/voiprecordings`. For the FusionPBX variant, see
   :doc:`/pbxrecordings/fusionpbx_recordings`.

Requirements
============

* A valid module license key (``LeasedictFSPBXCallRecordings_…``)
* An FS PBX **API token** — the module uses the FS PBX REST API, so
  **no host-side install is required** (unlike the FusionPBX variant)
* An imported FS PBX tenant with extensions (via the provider's Client
  Services tools)

Setup — Step by Step
====================

**0. Install the module files**

Unpack the recordings module package into
``modules/servers/pbxcallrecordings/``.

The client-area panel files are shared across the recordings modules
and ship with the **ictVoIP Billing addon** (v1.5.0+) — ensure the
addon is installed and current so these are in place:

* ``clientPbxRecordingsPanel.php`` → the WHMCS root (docroot)
* ``clientPbxRecordingsPanel.tpl`` → your active client theme's
  template directory (templates are shipped for the ictVoIP/prosper
  themes)

**1. Create the Call Recordings product**

In WHMCS, create a new product and set the module to
``pbxcallrecordings``. In the product's module settings, enter your
license key (``LeasedictFSPBXCallRecordings_…``), click **Verify**,
then **Activate**, then **Save**.

**2. Create the server record**

In WHMCS, add a server for the PBX host with **HTTPS enabled**:

* **Server name** and server **hostname (FQDN)**
* **IP address** / host IP
* **Access Hash** — the FS PBX API token (same as the FS PBX voice
  module uses). Username/Password are not used by this module — token
  auth only.

Click **Test Connection** to verify — it validates the API token
against the FS PBX REST API.

**3. Create the Provider**

Open the **ictVoIP Billing** dashboard and create a new provider:

* **Name:** e.g. ``FS PBX Call Recordings``
* **Server module:** ``pbxcallrecordings``

Save.

**4. Package Rates and tenant import**

In the ictVoIP Billing dashboard, select the **FS PBX Call Recordings**
provider:

* Set up its **Package Rates** for the recordings product (free
  minutes, per-direction per-minute rates, roundup increments, monthly
  fee)
* **Import an FS PBX tenant** with extensions to collect call
  recordings — click the **EXT** icon in Tenant/Domains to open the
  Extensions Manager

.. note::

   This quick start assumes the FS PBX host **already has tenants
   with call recordings enabled**. For a new Tenant/Domain and its
   extensions, you must first **enable Call Recording on each
   extension** in the Extensions Manager under Client Services —
   otherwise there will be no recordings to collect.

**5. Order for the client**

In the client's profile, use **Add New Order**, select the Call
Recordings product you created, and save.

**6. Set the Registration Date**

After the order completes, change the product's **Reg Date** to the
beginning of the month so the billing cycle aligns.

**7. Assign extensions**

Back in the ictVoIP Billing dashboard, select the **FS PBX Call
Recordings** provider → **Client Services → Extensions**, and assign
the extensions to the client for whom the Call Recordings product was
created. **Bulk assign** or **single assign** both work.

**8. Verify as the client**

Use **Login as Owner** on the client. Two ways to reach the recordings:

* Client area home → click the service → **Call Recordings Dashboard**
  button on the product page
* Client area home → **VoIP Management** card → **Call Recordings**
  (the card appears for clients with services in VoIP product groups —
  place the recordings product in a group such as ``ictVoIP
  Recordings`` or ``ictVoIP Service``)

The panel loads the tenant recording scope into a searchable, sortable,
paginated grid with a per-recording **Extension** column, CSV export,
in-browser **Play**, and **Download** through the module — no direct
PBX URL is exposed.

Billing (Optional)
==================

The module ships ``cron/autobill_recordings.php`` for usage-based
billing of recording minutes. Each run iterates Active recordings
services due for billing, totals recorded minutes per direction for the
bound tenant, applies the package's free-minutes pool, and invoices
overage at the package rates. Usage is tracked in two places: the
client-area panel (per-call detail) and standard WHMCS invoices.

CRON Configuration
------------------

.. important::

   The recordings autobill CRON **must run before** the WHMCS daily
   CRON — the recordings invoice must already exist when WHMCS runs
   its daily billing pass.

**Scheduling Requirements:**

On AlmaLinux 9 / systemd-based systems, cron jobs may default to UTC
even when server time, PHP-FPM timezone, and WHMCS timezone are all
correct — WHMCS automation relies on the execution time of cron.php,
not just internal settings. Specify ``TZ=`` explicitly in each cron
job, or set ``date.timezone`` in the system PHP INI.

**Recommended Schedule:**

.. code-block:: text

   WHMCS Daily CRON: 1:00 AM
   Recordings Autobill CRON: 12:55 AM (5 minutes before)

   Alternative Schedule:
   WHMCS Daily CRON: 2:00 AM
   Recordings Autobill CRON: 12:45 AM (75 minutes before)

Recording volumes are typically light, so a 5-minute lead is
sufficient for most installs; leave a wider buffer on large
multi-tenant hosts.

**CRON Entry Format:**

Replace ``yourwhmcs.com`` / the install path and ``America/Toronto``
with your timezone:

.. code-block:: bash

   # URL trigger (wget/curl or WHMCS URL cron)
   55 00 * * * TZ=America/Toronto GET https://yourwhmcs.com/modules/servers/pbxcallrecordings/cron/autobill_recordings.php?runfrom=cron

   # PHP CLI format (alternative)
   55 00 * * * TZ=America/Toronto /usr/bin/php -q /home/USERNAME/public_html/modules/servers/pbxcallrecordings/cron/autobill_recordings.php runfrom=cron

**CRON Parameters:**

* **TZ=America/Toronto** — explicit timezone (recommended on
  AlmaLinux 9 / systemd)
* **55 00** — time (12:55 AM in the specified timezone)
* **\* \* \*** — daily execution
* **GET** — HTTP method (or ``/usr/bin/php -q`` for CLI)
* **runfrom=cron** — execution parameter

.. note::

   The Package Rates row on the provider is what the cron rates
   against. If no provider/package binding exists, it falls back to a
   default per-minute rate — create the provider and rates before
   enabling billing.

.. seealso::

   * :doc:`/admin/autobill` — full autobill scheduling, timezone, and
     billing-cycle details.

Security
========

* Audio is fetched on demand from the PBX — nothing is stored in WHMCS
* Panel access validates the requested service belongs to the logged-in
  client; recordings are scoped to the service's assigned tenant and
  extensions
* API access is authenticated by the FS PBX API token
* A non-Active license replaces the service's client-area page with the
  license notice

Troubleshooting
===============

* **No call recordings found** — confirm Call Recording is **enabled
  on the extension** (Extensions Manager under Client Services), the
  tenant's extensions were imported (provider → Tenant/Domains → EXT),
  and **assigned to the client** (provider → Client Services →
  Extensions); also confirm the FS PBX API token is valid and has
  CDR/recordings read access
* **Test Connection fails** — verify the server record's FQDN, IP, API
  token, and HTTPS enabled
* **No invoice / wrong amounts** — confirm the provider exists and the
  product has Package Rates saved under it, and that the cron runs
  before the WHMCS daily cron
* **No Call Recordings button on the product page** — the module
  package wasn't fully unpacked, or the panel file/template wasn't
  copied in Step 0
* **License notice on the product page** — re-check the License Key in
  the product's module settings, then Verify/Activate
