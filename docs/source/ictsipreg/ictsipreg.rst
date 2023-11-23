**************************
ictSIP Registration Status
**************************

Track and alert Admins on SIP registration drops and recieve email alerts on key registrations. Retain logs for any number of days. Assign one or multiple admins to a registration account. Emails for registration lost sent once with detailed information and then upon a restored registration.
Currently supporting VoIPms and FusionPBX SIP registration collection. This addon is available for clients who already own the ictVoIP Billing app for WHMCS and a server module such as VoIPms API server module or FusionPBX server module or both at this time.

|

 .. image:: ../_static/images/admin/package_rates.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|

1) Select the VoIP Package

2) Assign a Tariff/Rate Card for the product

3) Select the Country for which your PBX resides. This will allow for billing of National calls and bill International calls based on the Exit Code used from the CDR.

4) Only "Check to Enable" if your PBX CDRs use a prefix for local/regional calls as where you do not use your country code or E.164 for Calls. 
   Example, if your location is London England and you have setup your regional calls to use a 0 prefix without the use of the country code 44 then you would check to enable and place 44 into the text box.


 We firstly recommend that you adjust your Dial Plan in order to produce proper E.164 destination_number for CDR output formatting.



|

 .. image:: ../_static/images/admin/prepend_country_code.png
        :scale: 50%
        :align: center
        :alt: Prepend Country Code
        
|

5) Set your Global Markup you wish to use against your Tariff costs.

6) Assign number of free Minutes that your package has if metered. If no free minutes then assign 0 in the text box.

|

VoIPms
******
   
Track and alert Admins on SIP registration drops and recieve email alerts on key registrations. Retain logs for any number of days. Assign one or multiple admins to a registration account. Emails for registration lost sent once with detailed information and then upon a restored registration.

|

 .. image:: ../_static/images/admin/custom_rates.png
        :scale: 50%
        :align: center
        :alt: Custom Rates
        
|

i.e. VoIP Calls to Poland package 1000 minutes metered but then once over 1000 min you have a custom rate per min on the overages. Or you have a flat custom rate for all calls, zero free minutes, which would override your Provider Tariff rates and Global Markup.

In order to use custom rates you must first change the column field of "status" to a zero. This can be found in your WHMCS DB Table of the Tariff you just imported. It should be located as such:

Database: ictvoip_whmc308 »Table: mod_ictvoipbilling_tariff_telnyx_outbound_2022_10

FusionPBX 
*********

Track and alert Admins on SIP registration drops and recieve email alerts on key registrations. Retain logs for any number of days. Assign one or multiple admins to a registration account. Emails for registration lost sent once with detailed information and then upon a restored registration.
