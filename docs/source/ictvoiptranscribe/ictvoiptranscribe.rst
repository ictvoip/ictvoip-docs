ictVoIP Call Transcription
**************************

The **ictVoIP Call Transcription** module integrates VoIP.ms
Transcribe email handling into WHMCS. It fetches transcription emails,
presents call transcripts and speaker-separated audio to clients, and
supports usage-based billing for transcription overages.

Features
========

* **AI call transcription** with speaker diarization for inbound and
  outbound calls on selected DIDs.
* **Client area view** — browse, search, and open call transcription
  details from the WHMCS client portal.
* **Email notifications** — alerts are sent when post-AI transcription
  processing completes.
* **Usage-based billing** — autobill cron invoices transcription overages
  through the ictVoIP Billing extended rates.
* **Multi-DID and multi-sub-account** support per service.

Installation
============

1. Copy the module directory into the WHMCS server modules location.
2. In WHMCS admin, go to **Setup → Products/Services → Servers** and
   create a new server using the ictVoIP Transcribe module.
3. The module creates the required database structure on activation.

Server and Product Configuration
================================

1. Create a WHMCS product and set the module to the ictVoIP Transcribe
   server module.
2. Add the product custom fields (exact names):

   * ``Sub-Acct/Username`` — the VoIP.ms sub-account.
   * ``DID`` or ``DID(s) Attached to Sub-Acct`` — the DID to transcribe.
   * ``Server/Domain`` — the tenant/domain identifier.

3. In the ictVoIP Billing addon, create a provider for the transcription
   service and configure package rates for the desired minute tiers and
   overage amounts.

Client Area
===========

Clients with an active transcription service can:

* View the list of transcribed calls in the client area.
* Open a transcription detail popup to read the full transcript.
* See speaker-separated text where diarization is available.

Autobill
========

The module includes an autobill cron script for invoicing transcription
overage minutes. Run it daily, after the WHMCS daily cron, on the
service due date. The script resolves the per-service sub-account and
DID, fetches usage, and creates a WHMCS invoice for any overage.
