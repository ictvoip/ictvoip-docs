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

The uncompressed server module file will have a directory named API. This will have the structure of where the files need to be uploaded to your FusionPBX host. 
Placing the script files onto your FusionPBX you may use WinSCP or FTP. The files do not need to be modified in any way and are not encoded. 

This example will provide the steps required to place the APIs onto your FusionPBX host or many hosts for the addition into WHMCS and the server creation within WHMCS.

  1) FusionPBX APIs should be uploaded to your host using an application like WinSCP or FTP. You would require root access to upload these files.  
  
    FusionPBX File locations and a directory which will be created:

::

    /var/www/fusionpbx/app/xml_cdr/export_cdr.php
    /var/www/fusionpbx/app/xml_cdr/import_cdr.php  
    /var/www/fusionpbx/app/xml_cdr/img/
    /var/www/fusionpbx/app/xml_cdr/img/loading.gif

|


  2) Please note that the import_cdr script can be used to import CDRs from other FusionPBX hosts to provide testing of correct CDR formatting of your FusionPBX setup. 
  
::   

*Use with caution as this script will overwrite any existing CDRs that maybe assigned to an existing Domain/Tenant.*
   
|


Adding a Server
****************

Adding your server module to WHMCS. We will provide an example of the FusionPBX server module install but the same steps can be used for other server modules. 
 1. You may purchase your server module here: `ictVoIP Billing Software <https://www.icttech.ca/index.php?rp=/store/ictvoip-billing-software>`_


 Download the ictVoIP Server module and extract to /home/$user/tmp.

 i.e. Archive: /home/$user/tmp/ictvoip_fusionpbx-release-x.x.x.zip

 After downloading and uncompressing your server module, copy the files to 

::

 /home/$user/public_html/modules/servers/  

|

Create your Server(s) for FusionPBX within WHMCS
*************************************************

|

 .. image:: ../_static/images/admin/server_edit.png
        :scale: 50%
        :align: center
        :alt: Adding a new Provider or PBX
        
|

::

 WHMCS/System Settings/Products & Services/Servers

|

Create your server with the following requirements:
####################################################

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


