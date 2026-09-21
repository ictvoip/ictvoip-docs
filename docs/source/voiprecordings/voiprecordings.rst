ictVoIP Call Recordings
***********************

The **ictVoIP Call Recordings** module is a WHMCS server module that
fetches and manages call recordings from the VoIP.ms API. Clients can
browse, play, and download recordings from the client area, while the
admin area provides configuration, a bulk backfill tool, and optional
usage-based billing.

Features
========

* **Call Recordings Management** — fetch, play, and download recordings
  from VoIP.ms in MP3 format.
* **Client Panel Interface** — DataTables-based browser with filtering
  by date range, account, and DID.
* **Audio Player** — built-in HTML5 audio player for in-browser playback.
* **Audit Logging** — all recording activity is logged for support and
  compliance.
* **Autobill** — usage-based billing cron that invoices overage recording
  minutes.
* **Bulk Backfill** — admin tool to import historical recording metadata
  across all active services.

Installation
============

1. Copy the module directory into the WHMCS server modules location.
2. Copy the client area panel file to the WHMCS root directory.
3. The module creates the required database structure on activation.

Security
========

.. warning::

   The WHMCS server IP **must** be whitelisted in the VoIP.ms API
   settings. API requests from non-whitelisted IPs will be rejected by
   VoIP.ms. This is required for secure and functional API access.

* API credentials and passwords are stored encrypted in the WHMCS
  database.
* Recording audio (MP3) is not stored locally. It is fetched on demand
  from VoIP.ms and delivered through the module so it is not exposed as
  a direct URL.
* Recording file access is restricted to active services owned by the
  logged-in client.
* All playback, download, and search activity is written to the audit
  log for review.

Server Configuration
====================

The module requires a WHMCS server record for API credentials:

1. In WHMCS admin, go to **Setup → Products/Services → Servers** and
   click **Add New Server**.
2. Choose **Module: ``voiprecordings``**.
3. Enter the VoIP.ms API credentials:

   * **API Username** — the VoIP.ms account email address.
   * **API Password** — the VoIP.ms API password.

4. Save the server record.

Product Configuration
=====================

1. Create a WHMCS product and set the module to ``voiprecordings``.
2. Add these product custom fields (exact names):

   * ``Sub-Acct/Username`` (text) — the VoIP.ms sub-account used for
     the API ``account`` filter.
   * ``DID`` or ``DID(s) Attached to Sub-Acct`` (text) — optional
     inbound DID filter.

Client Area Usage
=================

Clients access their recordings from:

1. Log in to the WHMCS client area.
2. Go to **Services → View Details** for the Call Recordings service.
3. Use the recordings panel to:

   * Browse by date, direction, caller, destination, duration, and size.
   * Play recordings in the browser.
   * Download MP3 files.
   * Filter by date range or account/sub-account.

Autobill
========

The module can invoice clients for overage recording minutes based on
VoIP.ms CDRs.

* Use the autobill cron script provided with the module.
* Recommended cron: daily, after the WHMCS daily cron.

The script:

1. Selects active ``voiprecordings`` services due today.
2. Resolves the ``Sub-Acct/Username`` custom field.
3. Fetches VoIP.ms CDRs for the billing cycle.
4. Filters CDR entries where ``description`` contains ``Call Recording``.
5. Applies per-direction rates and free minutes from the extended rates
   table.
6. Creates a WHMCS invoice with the calculated overage amount.

Bulk Backfill Tool
==================

Version 1.1.0 adds a bulk backfill admin tool for importing historical
recording metadata:

* Splits date ranges into day-sized windows to respect VoIP.ms rate
  limits.
* Configurable API delay with exponential-backoff retries.
* Per-service, per-window deduplication so the same recording is not
  imported twice.
* Live log output with progress bar and imported/skipped/error counters.
* Metadata-only import; audio is still fetched on-demand by the client
  panel.

