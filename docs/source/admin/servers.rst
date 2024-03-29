*********
Servers
*********

Use of our Server modules with the ictVoIP Billing System allows you to provision to our custom API for your PBX or Provider. Once installed your PBX(s) you may have an almost unlimited amount of PBX servers to support your infrastructure for billing from these hosts.

|

 .. image:: ../_static/images/admin/servers.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|

Installing the FusionPBX API
****************************

.. note:: 

 You may recieve a bundled zip package ictvoip_fusionPBX_module-release-1.3.2_PHP7.4-8.1.zip - this will have both the FusionPBX and WHMCS Server Module packages

|

Currently Supported Version of FPBX: 5.1.x - (for older version support please contact us)

The compressed file will have the structure of where the files need to be uploaded to your FusionPBX host. Please note you would also require ionCube Loader enabled for PHP 7.4 and 8.1.

i.e.

::

 Extract ictvoip_fusionpbx_5-1-x_extras.zip to
 /var/www/fusionpbx/

|
Placing the script files onto your FusionPBX you may use WinSCP or FTP. The files do not need to be modified in any way. 

This example will provide the steps required to place the APIs onto your FusionPBX host or many hosts for the addition into WHMCS and the server creation within WHMCS.

 1) FusionPBX APIs should be uploaded to your host using an application like WinSCP or FTP. You would require root access to upload these files.  
  

 FusionPBX File locations and a directory which will be created: (please review README.md for full installation instructions)

- example only, many more scripts would be required to be uploaded to your fusionpbx directory.


::

    /var/www/fusionpbx/app/xml_cdr/chkcon.php  
    /var/www/fusionpbx/app/xml_cdr/export_cdr.php
    /var/www/fusionpbx/app/xml_cdr/import_cdr.php  
    /var/www/fusionpbx/app/xml_cdr/img/
    /var/www/fusionpbx/app/xml_cdr/img/loading.gif

|


  2) Please note that the import_cdr script can be used to import CDRs from other FusionPBX hosts to provide testing of correct CDR formatting of your FusionPBX setup. You can find more information here for installation and use https://docs.ictvoip.ca/en/latest/cdr_main/cdr_maint.html
     
.. warning::  Use with caution as this script will overwrite any existing CDRs that maybe assigned to an existing Domain/Tenant.
   
|


Installing Server Module
**************************

.. note:: 

 You may recieve a bundled zip package ictvoip_fusionPBX_module-release-1.3.2_PHP7.4-8.1.zip - this will have both the FusionPBX and WHMCS Server Module packages
 The server module within this package will not be compressed. 

|

|
Adding your server module to WHMCS. We will provide an example of the FusionPBX server module install but the same steps can be used for other server modules. 

 1. You may purchase your server module here: `ictVoIP Billing Software <https://www.icttech.ca/index.php?rp=/store/ictvoip-billing-software>`_


    Download the ictVoIP Server module and extract to /home/$user/tmp.

 i.e. Archive: 

::

 /home/$user/tmp/ictvoip_fusionPBX_module-release-1.3.2_PHP7.4-8.1.zip

|
 After uploading and uncompressing your package copy the files from
 
::

 /home/$user/tmp/ictvoip_fusionPBX_module-release-1.3.2_PHP7.4-8.1/ictvoip_fusionPBX_module-release-1.3.2_PHP7.4-8.1/includes
 /home/$user/tmp/ictvoip_fusionPBX_module-release-1.3.2_PHP7.4-8.1/ictvoip_fusionPBX_module-release-1.3.2_PHP7.4-8.1/modules

|
 To
 
::

 /home/$user/public_html/

|
Once copied your directory server module files and directory structure should be:

::

 /home/$user/public_html/includes/hooks
 /home/$user/public_html/modules/servers/fusionpbx
 /home/$user/public_html/modules/servers/fusionpbx/img
 /home/$user/public_html/modules/servers/fusionpbx/lib
 /home/$user/public_html/modules/servers/fusionpbx/templates

|

Create the Server(s)
*********************

|
Within WHMCS to add and setup your servers go here:

::

 WHMCS/System Settings/Products & Services/Servers

|


|

 .. image:: ../_static/images/admin/servers_edit2.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


Server Module Requirements:
############################

|
Server Name [Just text] could be the FQDN of your hosted FusionPBX.
::

 Name: waterloo3.ictvoip.ca - FusionPBX v5.1.1
|
Hostname must be the FQDN of your hosted FusionPBX with active SSL certificate.
::

 Hostname: waterloo3.ictvoip.ca

|
IP Address can be the local IP or public
::

 IP Address: 102.100.100.20

|
Assigned IP can be the local IP or public
::

 Assigned IP addresses: 102.100.100.20

|
Maximum Accounts would typically be the maximum allowed tenants or the maximum total extensions for that PBX
::

 Maximum No. of Accounts: 100

|
Module in this case we select the Fusionpbx server module
::

 Module: Fusionpbx

|
This user should be created on the Fusion PBX side with superadmin group rights.
::

 Username: ictwat3api

|
This would be the password assigned to the FusionPBX API user
::

 Password: [PASSWD] 

|


Add more as required.

|


Server Connection Verification
################################
**
You must have SSL certificate installed on your FusionPBX server host name.
**

After your server details have been entered and saved you can now test your connection to your FusionPBX by clicking on the Test button next to the Server Module "FusionPBX". After clicking you should see "Attempting Connection" then if suscessful your should get "Connection successful." If there is a problem connecting with your FusionPBX server then you will have to further troubleshoot the issue before you continue your setup.

|

 .. image:: ../_static/images/admin/connection_test2.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|

.. _widget-section:
Server Widget
*************

|
**This feature is optional**

|

 .. image:: ../_static/images/admin/server_widget3.png
        :scale: 70%
        :align: center
        :alt: FusionPBX Server Status
        
|

FusionPBX Status Widget
#######################

Adding a FusionPBX Status Widget for your Servers can be accomplished by the following steps:

 1) Copy from your WHMCS host 
::

 /home/$user/public_html/status/index.php 

|

  to your FusionPBX host. Create the status directory if it does not exist.  
::

 /var/www/fusionpbx/app/status/index.php
   
|   
   Once you have copied the index.php file you should run:
   
::

 chown -R www-data:www-data /var/www/fusionpbx/app/status
 
|

WHMCS Setup
###########

 2) Add the status script location to your WHMCS Fusion PBX Server.
 
 ::


  WHMCS / System Settings / Servers
 
 |
  select edit the server to monitor and enter the URL for "Server Status Address" 

::

   https://myfusionpbx.ca/app/status/

|

 Then save.
 
|

 .. image:: ../_static/images/admin/server_widget_link2.png
        :scale: 70%
        :align: center
        :alt: Server widget link
        
|

|

 3) Add the Widget to your WHMCS Admin area by selecting the "Network Status" from the COG settings for Widgets at the top right of the Admin Dashboard.
  
|

 .. image:: ../_static/images/admin/show_widgets.png
        :scale: 70%
        :align: center
        :alt: Server widget link
        
|
  
 
