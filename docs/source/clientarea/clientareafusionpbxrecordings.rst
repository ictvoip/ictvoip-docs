**************************************
FusionPBX Call Recordings Client Area
**************************************

|

 .. image:: ../_static/images/clientarea/new_client_area_voip.png
        :scale: 50%
        :align: center
        :alt: Call Recording Client Area
        
|

The **FusionPBX Call Recordings** server module
(``fusionpbxcallrecordings``) gives clients a **Call Recordings
Dashboard** for recordings hosted on their FusionPBX system.
Recording audio stays on the PBX — it is fetched on demand when the
client plays or downloads it, never copied to WHMCS.

Reaching the Dashboard
**********************

Two entry points:

* Client area home → click the Call Recordings service → **Call
  Recordings Dashboard** button on the product page.
* Client area home → **VoIP Management** card → **Call Recordings**
  (the card appears for clients with services in VoIP product
  groups).

Dashboard Features
******************

* Searchable, sortable, paginated grid of recordings for the service's
  assigned tenant and extensions.
* Per-recording **Extension** column so calls are attributable to the
  correct extension.
* **CSV export** of the listed recordings.
* In-browser **Play** and **Download** delivered through the module —
  no direct PBX URL is exposed.
* Recordings are scoped to the logged-in client's own service;
  clients cannot see other tenants' recordings.

|

 .. image:: ../_static/images/clientarea/fusionpbx_callrecordings_view.png
        :scale: 50%
        :align: center
        :alt: Call Recording Client Area
        
|

* Player

|

 .. image:: ../_static/images/clientarea/fusionpbx_callrecordings_player.png
        :scale: 50%
        :align: center
        :alt: Call Recording Client Area
        
|

.. seealso::

   * :doc:`/pbxrecordings/fusionpbx_recordings` — FusionPBX Call
     Recordings module setup (admin).
   * :doc:`/clientarea/clientareafspbxrecordings` — the FS PBX variant.
   * :doc:`/voiprecordings/voiprecordings` — the VoIP.ms-based
     recordings module.
