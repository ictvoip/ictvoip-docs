**************************
FusionPBX CDR Maintenance
**************************

Getting Started
***************

 .. updated::  Imporoved Import will not overwrite or duplicate any existing CDRs that may already exist with a Domain/Tenant.

|

Once you have installed the addon features for your FusionPBX ictVoIP Billing module you can then create a new menu item for your CDR maintenance when testing or migrating from other FusionPBX hosts.

To begin create your menu item


|

 .. image:: ../_static/images/fusionpbx/add_menu_item.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|


Make the following entries


|

 .. image:: ../_static/images/fusionpbx/create_cdr_maint_menu_v2.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|

Be sure to save and reload your new menu item.
Once you have saved and reloaded you must logout and log back in to view your new menu item.


|

 .. image:: ../_static/images/fusionpbx/menu_item_save_v2.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|


Exporting (any v5.1+)
*********************

Select the tenant of CDRs you wish to export and choose Apps / Call Detail records and click Export / Format / CSV

|

 .. image:: ../_static/images/fusionpbx/export_cdr.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|


Save your CSV Exported CDR for use to import onto your DEV or new production FusionPBX host


|

 .. image:: ../_static/images/fusionpbx/sace_CDR.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|





Importing
*********

 .. updated::  Imporoved Import will not overwrite or duplicate any existing CDRs that may already exist with a Domain/Tenant.

|

Currently supports Importing of CDRs Exported from v5.0.x, 5.1.x, 5.2.x and 5.3.x and allows the importing of these CDRs based on Tenant/Extension by Extension or all.
If importing from tenant accounts extension then you must at minimum create the extension(s) which you require CDR details. The tenant (domain) should match from the exported FPBX host from where the CDRs have been exported.
Once you have the tenant and extensions configured to import then select the tenant then extension to begin.


|

 .. image:: ../_static/images/fusionpbx/import_export1.png
        :scale: 45%
        :align: center
        :alt: Import Tool
        
|


Select the tenant and extention(s) you wish to import from your CSV exported from your production host. Choose your CSV to import then click Import CDRs.


|

 .. image:: ../_static/images/fusionpbx/import_full.png
        :scale: 45%
        :align: center
        :alt: Import Tool
        
|

Selective Exporting
*******************

The import tool also comes with a custom selective export tool which allows the selection of the tenant, all extensions or individual extensions by date range.

|

 .. image:: ../_static/images/fusionpbx/export_1.png
        :scale: 45%
        :align: center
        :alt: Import Tool
        
|

