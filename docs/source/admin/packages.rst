***************
VoIP Packages
***************

VoIP Package assignments and setup of server modules for extentions and API connection to your PBX or Provider API.

1) Select the VoIP Package

2) Assign a Tariff/Rate Card for the product

3) Select the Country for which your PBX resides. This will allow for billing of National calls and bill International calls based on the Exit Code used from the CDR.

4) Only "Check to Enable" if your PBX CDRs use a prefix for local calls as where you do not use your country code or E.164 for Calls. 
   Example, if your location is London England and you have setup your regional calls to use a 0 prefix without the use of the country code 44 then you would check to enable and place 44 into the text box.
   
   pic

5) Set your Global Markup you wish to use against your Tariff costs.

6) Assign number of free Minutes that your package has if metered. If not free minutes then assign 0 in the text box.

Custom Rates
*************
   
Here you can be creative as to how you would like to manage your custom rates.  When examining how your specific custom packages may be designed you could create a package where only calls outbound for a particular Country could be metered at a special rate.

i.e. VoIP Calls to Poland package 1000 minutes metered but then once over 1000 min you have a custom rate per min on the overages. Or you have a flat custom rate for all calls, zero free minutes, which would override your Provider Tariff rates and Global Markup.

