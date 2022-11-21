******************
Client Admin Area
******************
|

Product Assignment
#####################

Administration of server modules and billing would be setup with client products.  After you have your Addon and Server module installed and have created a VoIP product either metered or not you can add the product to the WHMCS client products. This example shows that you already have knowledge of adding products to your client accounts. Further information can be located with the WHMCS supported documentation here: `WHMCS Docs <https://docs.whmcs.com/Documentation_Home>`_

|

 .. image:: ../_static/images/clientadmin/client_product1.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
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
************************

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
**************************

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
The external CDR text file from LesNet only updates every 24hrs. Set your CRON for autobill accordingly.

|
Special Considerations: 
*************************
 
Our API pulls the CDR outbound details from the Destination column within FusionPBX and the inbound from the Caller Destination column. 

It is best to try and match your formatting outbound to include your Country code. This will elliminate the requirement for the use of the filter used within setting your package rates.

"Check to Enable" if your PBX CDRs use a prefix for local/regional calls as where you do not use your country code. For further information about this setting please refer to the `VoIP Package Rates <../admin/packages.html>`_ section.


Low Credit Balance Alerts/Suspend
###################################

Low Credit Balance Thresholds are set within the Client Profile. When a low balance threshold has been set this will allow for a couple of automation events. 

|

 .. image:: ../_static/images/clientadmin/client_profile_lowbal.png
        :scale: 40%
        :align: center
        :alt: Adding a new Provider or PBX
        
|

Low Balance
*************

1) When the credit balance falls below the set threshold an alert email is sent during the Daily Autobill CRON. A custom email Template located in General Messages must be created with the name "Low Balance Alert" and can include the following as an example:

::

  Dear {$client_first_name},

  This is a friendly reminder that your account is low in funding. Please log into the ictVoIP Client Area and add funds to your account.

  Login & top up here: https://www.ictvoip.ca/clientarea.php?action=addfunds
  All ictVoIP Service accounts must carry a positive balance in order to maintain service.

  Your current balance for your service(s)
  Account# {$client_id} is: {$client_credit}

  Your current low balance notification is set at ${$client_custom_field_lowbalancethreshold}.00
  
  If you do not wish to receive email notifications   from our system anymore, please contact us.

|

|

 .. image:: ../_static/images/clientadmin/low_bal_alert.png
        :scale: 70%
        :align: center
        :alt: Adding a new Provider or PBX
        
|

Suspend
**********

2) When the credit balance is zero and or a possible balance owing greater that the credit blance then Autosuspend CRON will suspend all calls. Once a top up of the account has been provided and the account has a positive credit balance with no outstanding balances then the AutoSuspend CRON will un-suspend the account.  This process is done by triggering the PBX/Switch to either disable the Gateway/Trunk or API to Providers suspend function. For certain accounts you have the option of manually overriding the auto suspend by setting the "VoIP Suspended" to no and the "Manual VoIP Suspend" to no.  An auto generated email can be sent to the client by creating an email template within General Messages and must have the name "VoIP Zero Balance" and can have the following as an example:

::

  Dear {$client_name},

  This is a friendly reminder that your ictVoIP service must carry a positive balance.
  The details of this are below:

  ictVoIP not Active: No VoIP Credit Balance
  Credit Balance: ${$client_credit}
  Outstanding Balance: {$client_due_invoices_balance}
  Low Balance Threshold: ${$client_custom_field_lowbalancethreshold}.00

  All VoIP/SIP accounts must carry a positive balance in order for service connection.

  To top up your account please go here to make your deposit and apply it to any outstanding amounts,
  https://www.ictvoip.ca/clientarea.php?action=addfunds

  Please allow up to 1min for your deposit to synchronize with the system before your account is able to place calls.

  If you cannot make a deposit please contact us as soon as possible to get your service reactivated.


|

|

 .. image:: ../_static/images/clientadmin/zero_bal_alert.png
        :scale: 70%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


The CRON for autosuspend example: 
*(replace MYMODULE with the server module you have installed)*

::

  */5    *    *    *    *  https://www.mywhmcsserver.com/modules/servers/MYMODULE/autosuspend.php?runfrom=cron >/dev/null 2>&1

|


Module Commands
*****************

**TBA**

If you do not wish to use the Autosuspend feature you may manually trigger the Suspend & Unsuspend commands within the Clients VoIP Product.

|

 .. image:: ../_static/images/clientadmin/manual_FS_commands.png
        :scale: 60%
        :align: center
        :alt: Adding a new Provider or PBX
        
|




Custom Client Profile Fields
################################

Some settings for client VoIP services should be defined if you wish to use the autosuspend, low balance alerts and auto top-ups. 

Autosuspend
*************

Required to enable autosuspend "Has VoIP Service" to Yes. "Manual VoIP Suspend" can be used to suspend all VoIP service and "VoIP Suspended" will provide the state of suspension which can produce an override by selecting Yes or No. "None" is the default position for Autosuspend.

Low Balance Threshold 
***********************

The value set here indicates the credit balance threshold that when reached or falls below this value will send an email alert from a custom email template, as noted above, letting the client know that it is time to top-up. Leaving this field blank indicates that Low Balance threshold is not followed and is disabled from sending alerts.

Auto VoIP Top-Up
******************

**TBA**


Fields used for this function are "CC Auth on File", "Date CC Auth Entered" and "Auto VoIP Top Amount". Currently they are not active. To have this feature available please contact Sales @ ictVoIP.ca

|

 .. image:: ../_static/images/clientadmin/custom_client_fields.png
        :scale: 30%
        :align: center
        :alt: Adding a new Provider or PBX
        
|

