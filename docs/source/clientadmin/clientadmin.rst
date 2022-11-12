******************
Client Admin Area
******************
|

Product Assignment
********************

Administration of server modules and billing would be setup with client products.  After you have your Addon and Server module installed and have created a VoIP product either metered or not you can add the product to the WHMCS client products. This example shows that you already have knowledge of adding products to your client accounts. Further information can be located with the WHMCS supported documentation here: `WHMCS Docs <https://docs.whmcs.com/Documentation_Home>`_

|

 .. image:: ../_static/images/clientadmin/client_product1.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


Low Credit Balance Alerts/Suspend
**********************************

Low Credit Balance Thresholds are set within the Client Profile. When a low balance threshold has been set this will allow for a couple of automation events. 

|

 .. image:: ../_static/images/clientadmin/client_profile_lowbal.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


1) When the credit balance falls below the set threshold an alert email is sent during the Daily Autobill CRON

|

 .. image:: ../_static/images/clientadmin/lowbal_email.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


2) When the credit balance is zero and a possible balance owing then Autosuspend CRON will suspend all calls. Once a top up of the account has been provided and the account has a positive credit balance then the AutoSuspend CRON will un-suspend the account.  This process is done by triggering the PBX/Switch to either disable the Gateway/Trunk or API to Providers suspend function.

|

Formatting to FusionPBX API
*****************************

Once your VoIP product has been assigned there are fields which must follow the following formats.

|

 1) Assign your FusionPBX server from the drop down. If only one server has been assigned it will appear and be selected. 

.. image:: ../_static/images/clientadmin/client_admin_server.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|

 2) Assign the Domain/Tenant with Main DID attached to Domain 
::
 
  mcon.wat5.ictvoip.ca | 5192229000
  
|
 3) Assign the extension you wish to have within the clients billing. Multi extension should use the | as the seperator.
  
::
  
   2112 | 2113 | 2114 | 2115 | 2216
   
|
 4) Save and then test your API connectivity to your FusionPBX account by then going to the Client's account CDR view in Client Area.
 
|

Formatting to Vodia API
***************************

Once your VoIP product has been assigned there are fields formatting which must be followed.

 1) Assign your Vodia PBX server from the drop down. If only one server has been assigned it will appear and be selected. 

|

 .. image:: ../_static/images/clientadmin/vodia_format.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|

 2) Assign the Tenant | Inbound DID(s) to Tenant 
::
 
  cffm.wat1.ictvoip.ca | 5484815577 | 5197830020 | 8300
  
|
 3) Assign the DID or extension you wish to have within the clients billing. 
  
::
  
   8300
|
 4)  Ext Profile First Name	from your Extension Client Name

|

 5) Inbound Search String (Ext/Firstname)
|
 6) Save and then test your API connectivity to your Vodia account by then going to the Client's account view and list CDRs for that tenant.
 
|
 
Formatting to LesNet API
***************************** 

Once your VoIP product has been assigned there are fields formatting which must be followed.

 1) Assign your LesNet API server from the drop down. If only one server has been assigned it will appear and be selected. 

|

 .. image:: ../_static/images/clientadmin/lesnet_format.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


2) Domain is Peer | DID
::
 
  D4E3CD2BFC791 | 12046664021
  
|
 3) Assign the DID to username
  
::
  
   12046664021
|

Custom Product Fields
########################
|

 4) Peer ID
 ::
  
   D4E3CD2BFC791
|
 
 5) DID(s) Attached to Peer
::
  
   12046664021
|

 6) CDR Link

::
  
   https://portal.les.net/cdr/11330_0000.txt
   
|

The external CDR text file from LesNet only update every 24hrs. Set your CRON for autobill accordingly.

|
Special Considerations: 
**************************
 
Our API pulls the CDR outbound details from the Destination column within FusionPBX and the inbound from the Caller Destination column. 

It is best to try and match your formatting outbound to include your Country code. This will elliminate the requirement for the use of the filter used within setting your package rates.

"Check to Enable" if your PBX CDRs use a prefix for local/regional calls as where you do not use your country code. For further information about this setting please refer to the `VoIP Package Rates <../admin/packages.html>`_ section.
