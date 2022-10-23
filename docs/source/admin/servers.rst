*********
Servers
*********

Use of our Server modules with the ictVoIP Billing System allows you to provision to our custom API for your PBX or Provider. Once installed your PBX(s) you may have an almost unlimited amount of PBX servers to support your infrastructure for billing from these hosts.

|

 .. image:: ../_static/images/admin/servers1.png
        :scale: 70%
        :align: center
        :alt: Adding a new Provider or PBX
        
|



Installing the API
*******************

The uncompressed server module file will have a directory named API. This will have the structure of where the files need to be uploaded to your FusionPBX host. 
To place the files onto your FusionPBXThe files do not need to be modified in any way and are not encoded. 

This example will provide the steps required to place the APIs onto your FusionPBX host or many hosts for the addition into WHMCS and the server creation within WHMCS.

  1) FusionPBX APIs should be uploaded to your host using an application like WinSCP or FTP. You would require root access to upload these files.  
  
  FusionPBX File locations and a directory which will be created:

  /var/www/fusionpbx/app/xml_cdr/export_cdr.php
  /var/www/fusionpbx/app/xml_cdr/import_cdr.php  
  /var/www/fusionpbx/app/xml_cdr/img/
  /var/www/fusionpbx/app/xml_cdr/img/loading.gif

  2) Please note that the import_cdr script can be used to import CDRs from other FusionPBX hosts to provide testing of correct CDR formatting of your FusionPBX setup. 
   *** Use with caution as this script will overwrite any existing CDRs that maybe assigned to an existing Domain/Tenant. ***
   
|


Adding a Server
****************

In this case we will provide an example of the FusionPBX server module. To do this create your Server(s) for FusionPBX within WHMCS

WHMCS/System Settings/Products & Services/Servers

Create your server with the following requirements:

Name: waterloo5.ictvoip.ca - FusionPBX
- this could be the FQDN of your hosted FusionPBX
Hostname: waterloo5.ictvoip.ca
- this needs to be the FQDN of your hosted FusionPBX
IP Address: 102.100.100.20
- this can be the local IP or public
Assigned IP addresses: 102.100.100.20
- this can be the local IP or public
Maximum No. of Accounts: 100
- this would typically be the maximum allowed tenants or the maximum total extensions for that PBX
Module: Fusionpbx
- in this case we select the Fusionpbx server module
Username: ictapi
- This user should be created on the Fusion PBX side with superadmin group rights.
Password: [PASSWD] 
- This would be the password assigned to the FusionPBX API user

Add more as required.


