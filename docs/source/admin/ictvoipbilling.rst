###################################
Installing ictVoIP Billing Module
###################################


ictVoIP Billing can be installed on WHMCS v8.5.x and v8.6.x running PHP7.x and soon PHP8.1. Compatible with Apache and Litespeed. However this guide assumes you are starting with a basic install of WHMCS with https enabled and understand the administration of the WHMCS platform. This install has been designed to be fast, simple and modular, and generally takes 5 minutes or less. Install Video TBA

1. After downloading the ictVoIP Billing .zip

You may select your server module required for your PBX or Provider API.

Purchase your server module here: ictVoIP Billing Software

Download the ictVoIP Billing Addon along with your Server module and extract to /home/$user/tmp.

i.e. Archive: /home/$user/tmp/ictvoip_billing-release-x.x.x.zip
mySQL Table Import

Import the Country Codes table to your WHMCS DB - mod_ictvoipbilling_country_codes.sql
Important - Licensing

Activating the ictVoIP Billing System enter your license keys into the following locations within your modules.
ictVoIP Billing Addon

System Settings / Apps & Integrations / Addon Modules / - Click Activate then configure and enter your license and the appropriate Access control groups and save.

i.e. LeasedictVoIP_a3174afbf93b3b8ba8f3
