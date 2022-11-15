*********
Servers
*********

Use of our Server modules with the ictVoIP Billing System allows you to provision to our custom API for your PBX or Provider. Once installed your PBX(s) you may have an almost unlimited amount of PBX servers to support your infrastructure for billing from these hosts.

|

 .. image:: ../_static/images/admin/servers1.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|

Installing the API
*******************

The uncompressed server module file will have a directory named [api]. This will have the structure of where the files need to be uploaded to your FusionPBX host. 

i.e.

::

 /ictvoip_fusionPBX_module-release-1.3.0_PHP7.4-8.1/api/fusionpbx/var/www/fusionpbx/app/xml_cdr

|
Placing the script files onto your FusionPBX you may use WinSCP or FTP. The files do not need to be modified in any way. 

This example will provide the steps required to place the APIs onto your FusionPBX host or many hosts for the addition into WHMCS and the server creation within WHMCS.

 1) FusionPBX APIs should be uploaded to your host using an application like WinSCP or FTP. You would require root access to upload these files.  
  

 FusionPBX File locations and a directory which will be created:
::

    /var/www/fusionpbx/app/xml_cdr/chkcon.php  
    /var/www/fusionpbx/app/xml_cdr/export_cdr.php
    /var/www/fusionpbx/app/xml_cdr/import_cdr.php  
    /var/www/fusionpbx/app/xml_cdr/img/
    /var/www/fusionpbx/app/xml_cdr/img/loading.gif

|


  2) Please note that the import_cdr script can be used to import CDRs from other FusionPBX hosts to provide testing of correct CDR formatting of your FusionPBX setup. 
     
.. warning::  Use with caution as this script will overwrite any existing CDRs that maybe assigned to an existing Domain/Tenant.
   
|


Installing Server Module
**************************
|
Adding your server module to WHMCS. We will provide an example of the FusionPBX server module install but the same steps can be used for other server modules. 

 1. You may purchase your server module here: `ictVoIP Billing Software <https://www.icttech.ca/index.php?rp=/store/ictvoip-billing-software>`_


    Download the ictVoIP Server module and extract to /home/$user/tmp.

 i.e. Archive: 

::

 /home/$user/tmp/ictvoip_fusionPBX_module-release-1.3.0_PHP7.4-8.1.zip

|
 After downloading and uncompressing your server module, copy the files from
 
::

 /home/$user/tmp/ictvoip_fusionPBX_module-release-1.3.0_PHP7.4-8.1/modules/servers/

|
 To
 
::

 /home/$user/public_html/modules/servers/

|
Once copied your directory server module files and directory structure should be:

::

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

 .. image:: ../_static/images/admin/server_edit.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


Server Module Requirements:
############################

|
Server Name could be the FQDN of your hosted FusionPBX
::

 Name: waterloo5.ictvoip.ca - FusionPBX
|
Hostname needs to be the FQDN of your hosted FusionPBX
::

 Hostname: waterloo5.ictvoip.ca

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

 Username: ictapi

|
This would be the password assigned to the FusionPBX API user
::

 Password: [PASSWD] 

|


Add more as required.

|


Server Connection Verification
################################

After your server details have been entered and saved you can now test your connection to your FusionPBX by clicking on the Test button next to the Server Module "FusionPBX". After clicking you should see "Attempting Connection" then if suscessful your should get "Connection successful." If there is a problem connecting with your FusionPBX server then you will have to further troubleshoot the issue before you continue your setup.

|

 .. image:: ../_static/images/admin/connection_test.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


Adding Server(s) Widget (optional)
**********************************
|
**This feature is optional**

|

 .. image:: ../_static/images/admin/server_widget.png
        :scale: 70%
        :align: center
        :alt: FusionPBX Server Status
        
|
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

 chown www-data:www-data /var/www/fusionpbx/app/status
 
|

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

 .. image:: ../_static/images/admin/server_widget_link.png
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
  
 
