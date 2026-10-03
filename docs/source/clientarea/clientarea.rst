**************************
Client Area Custom Views
**************************

Depending on your Server Module we have custom VoIP Panels associated for each. More development is underway for an updated VoIP Panel for clients with VoIP Products and our Server Modules.

.. important::

   **New in v1.5.0 — ictVoIP child theme.** The custom client-area
   templates now ship as the ``ictvoip`` theme, a child of WHMCS's
   **Twenty-One** template. Set the WHMCS default template to
   **ictvoip** (System Settings → General Settings → Template) so the
   client area uses the ictVoIP layout and styling provided for the
   VoIP products — including the Call Records / Call Recordings
   dashboard buttons and the VoIP Management views documented below.

   Bundled WHMCS themes (``twenty-one``, ``six``) are overwritten on
   WHMCS upgrades; the ``ictvoip`` child theme keeps the custom
   template overrides intact across upgrades.

Client panels are documented for each server module view:

* **FusionPBX Client Area & CDRs** — client CDRs and CSV export for FusionPBX services.
* **FS PBX Client Area & CDRs** — client CDRs and CSV export for FS PBX services.
* **FusionPBX Call Recordings Client Area** — the Call Recordings Dashboard for the FusionPBX recordings module.
* **FS PBX Call Recordings Client Area** — the Call Recordings Dashboard for the FS PBX recordings module.
* **VoIPms Client Area & VoIP Panel** — the VoIP Panel for VoIP.ms-based services, including CDRs, faxing, call rates, voicemail, and caller ID blocking.

.. toctree::
  :maxdepth: 3

  clientareafusionpbx
  clientareafspbx
  clientareafusionpbxrecordings
  clientareafspbxrecordings
  clientareaproviders
  
