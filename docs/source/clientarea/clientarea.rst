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

Client panels are documented for the two primary server module views:

* **FusionPBX Client Area & CDRs** — client CDRs and CSV export for FusionPBX services.
* **Providers Client Area & VoIP Panel** — the VoIP Panel for provider-based services, including CDRs, faxing, call rates, voicemail, and caller ID blocking.

.. toctree::
  :maxdepth: 3

  clientareafusionpbx
  clientareaproviders
  
