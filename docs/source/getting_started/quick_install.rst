*************
Quick Install
*************
.. image:: ../_static/images/document_logo.png
        :scale: 100%

|

Welcome to the ictVoIP Billing installation quick guide.

|

ictVoIP Billing can be installed on WHMCS v8.5.x and v8.6.x running PHP7.x and soon PHP8.1. Compatible with Apache and Litespeed. However this guide assumes you are starting with a **basic** install of WHMCS with https enabled and understand the administration of the WHMCS platform. This install has been designed to be fast, simple and modular, and generally takes 5 minutes or less. Install Video TBA


**1.** After downloading the ictVoIP Billing .zip

You may select your server module required for your PBX or Provider API.

Purchase your server module here: `ictVoIP Billing Software <https://www.icttech.ca/index.php?rp=/store/ictvoip-billing-software>`_


Download the ictVoIP Billing Addon along with your 
Server module and extract to /home/$user/tmp.

i.e. Archive: /home/$user/tmp/ictvoip_billing-release-x.x.x.zip

MySQL Table Import
==================

Import the Country Codes table to your WHMCS DB 
- mod_ictvoipbilling_country_codes.sql


Important - Licensing
=====================

Activating the ictVoIP Billing System enter your license keys 
into the following locations within your modules. 

ictVoIP Billing Addon
---------------------
System Settings / Apps & Integrations / Addon Modules / 
- Click Activate then configure and enter your license and the appropriate Access control groups and save.

i.e. LeasedictVoIP_a3174afbf93b3b8ba8f3

|

 .. image:: ../_static/images/admin/addon_lic.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


FusionPBX Server Module
-----------------------
System Settings / Products & Services /
- Create your new VoIP Product with description and with the Module Settings Tab, select Fusionpbx Module name and then place your License Key in the box, save. 

i.e. LeasedFusionPBX_f14fa0a312e4fac10107

|

 .. image:: ../_static/images/admin/product_module_fpbx.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


Vodia Server Module
---------------------
System Settings / Products & Services /
- Create your new VoIP Product with description and with the Module Settings Tab, select Vodia Module name and then place your License Key in the box, save. 

i.e. LeasedVodia_f14fa0a312e4fac10107

|

 .. image:: ../_static/images/admin/product_module_vodia.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


LesNet Server Module
---------------------
System Settings / Products & Services /
- Create your new VoIP Product with description and with the Module Settings Tab, select LesNet Module name and then place your License Key in the box, save. 

i.e. LeasedLesNet_f14fa0a312e4fac10107

VoIPms Server Module
---------------------
System Settings / Products & Services /
- Create your new VoIP Product with description and with the Module Settings Tab, select VoIPms Module name and then place your License Key in the box, save. 

i.e. LeasedVoIPms_f14fa0a312e4fac10107


VoIP Fax Server Module
-----------------------
System Settings / Products & Services /
- Create your new VoIP Product with description and with the Module Settings Tab, select VoIPFax Module name and then place your License Key in the box, save. 

i.e. LeasedVoIPFax_f14fa0a312e4fac10107

|

Special Notes:
==============

.htaccess
----------

1) .htaccess modification if Timeout Server error 500 is found when running with Apache or LiteSpeed. This can occur during large imports of Tariffs or CRON autobill execution on a large number of CDR records pulled from your PBX/Provider server module.

a) Modify .htaccess [LiteSpeed]

LiteSpeed
----------
RewriteRule .* - [E=noabort:1]

RewriteRule .* - [E=noconntimeout:1]

PHP Requirements [Apache & Litespeed]
-------------------------------------

i.e.

IfModule php7_module

   -php_flag display_errors On
   
   -php_value max_execution_time 8600
   
   -php_value max_input_time 8600
   
   -php_value max_input_vars 1000
   
   -php_value memory_limit 8096M
   
   -php_value session.gc_maxlifetime 1440
   
   -php_value session.save_path "/tmp"
   
   -php_value upload_max_filesize 4000M
   
   -php_value date.timezone "America/Toronto"
   
   -php_value post_max_size 1000M
   
   -php_flag zlib.output_compression Off
   

IfModule

IfModule lsapi_module

   -php_flag display_errors On
   
   -php_value max_execution_time 8600
   
   -php_value max_input_time 8600
   
   -php_value max_input_vars 1000
   
   -php_value memory_limit 8096M
   
   -php_value session.gc_maxlifetime 1440
   
   -php_value session.save_path "/tmp"
   
   -php_value upload_max_filesize 4000M
   
   -php_value date.timezone "America/Toronto"
   
   -php_value post_max_size 1000M
   
   -php_flag zlib.output_compression Off

IfModule

|

CRON Setup
============

Time Zone
------------

If your hosting provider default PHP time.zone is using the incorrect timezone and also does not allow php.ini to override the time.zone you could use wHMCS configuration.php to set the CRON run default timezone:

::

  date_default_timezone_set('America/Toronto');

|

Edit the timezone to the appropriate timezone of your PBX server. Save the file. Timezones should be tz format.


Ubuntu
---------

CRON issues running cPanel on Ubuntu maybe found where you should enable normal shell for the user account in which the CRON is being run from.
For Ubuntu CRON issues please contact cPanel if utilized.

WHM/cPanel Support Advice:
----------------------------

`cPanel Article <https://support.cpanel.net/hc/en-us/articles/6717639153943-Ubuntu-Jailed-Shell-users-unable-to-connect-to-mysqld-sock>`_


|

WHMCS System Settings / General
================================

Ensure your WHMCS System URL is set to HTTPS. 

|

ictVoIP Billing Module Setup
=============================

1) Create new Provider/PBX (i.e Telnyx - FusionPBX)  (you would require a server module for your PBX or provider)
2) Import and map your Tariff or Rate Card CSV from your VoIP provider. 
   Attention to the required mapped column fields from your providers CSV:
   /Description/Prefix/RateValue/Increment/
3) Setting up your Package Rates (you would require a server module for your PBX or provider)
 a) Select the VoIP Product you created earlier here:   `FusionPBX Server Module <#fusionpbx-server-module>`_

 b) Select your Tariff that was just imported

 c) Select the Country Code/Exit Code of your Billing Region. 
    - if you wish to strip any leading digits of the CID and replace it with the selected Country Code then select "Check to enable: - Incorrect prefix removal / prepend Country Code" and enter the leading digit to be stripped.

 d) Enter your Global Markup rate for this product.

 e) Set Free minutes to 0 if none are allocatted for your product or free minutes allowed before billed if metered billing product.

 f) Custom Package Rates [status=0] in Tariff Table
    Set your incremental inbound/outbound costs to sell at. ie. 0.00967
    Set your custom incremental billing value in sec. ie. 6/6 or 30/6 or 1/1
    If you wish to use Custom Rates for specific prefixes or regions you must set [status] column to 0 in order for those Prefixes to bill using the set custom rates.
  
