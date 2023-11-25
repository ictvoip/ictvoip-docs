**************************
FusionPBX CDR Maintenance
**************************

Getting Started
***************

.. warning::  Use with caution as this script will overwrite any existing CDRs that maybe assigned to an existing Domain/Tenant.

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

 .. image:: ../_static/images/fusionpbx/create_cdr_maint_menu.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|

Be sure to save and reload your new menu item.
Once you have saved and reloaded you must logout and log back in to view your new menu item.


|

 .. image:: ../_static/images/fusionpbx/menu_item_save.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|


Exporting
*********

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

.. warning::  Use with caution as this script will overwrite any existing CDRs that maybe assigned to an existing Domain/Tenant.

|

Currently supporting CDRs Exported from versions 5.0.x and 5.1.x and allows the importing of these CDRs based on Extension by Extension.
If importing from tenant accounts extension then you must at minimum create the extensions which you require CDR details. The tenant (domain) should match from the exported FPBX host from where the CDRs have been exported.
Once you have the tenant and extensions required to import then select the tenant then extension.


|

 .. image:: ../_static/images/fusionpbx/CDR_Maint.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|


Select browse to upload your CSV exported from your production host.


|

 .. image:: ../_static/images/fusionpbx/import_cdrs.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|

Select your file and then open button

|

 .. image:: ../_static/images/fusionpbx/import_CDR_by_EXT.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|



Once selected click submit to begin import

|

 .. image:: ../_static/images/fusionpbx/submit_import.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|

Depending on the size of your exported CDR the process will complete as follows.



|

 .. image:: ../_static/images/fusionpbx/import_completed.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|
