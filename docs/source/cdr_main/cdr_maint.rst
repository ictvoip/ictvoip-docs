**************************
FusionPBX CDR Maintenance
**************************


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


Currently supporting CDRs Exported from versions 5.0.x and 5.1.x and allows the importing of these CDRs based on Extension by Extension.
If importing from tenant accounts extension then you must at minimum create the extensions which you require CDR details. The tenant (domain) should match from the exported FPBX host from where the CDRs have been exported.
Once you have the tenant and extensions required to import then select the tenant then extension.


|

 .. image:: ../_static/images/fusionpbx/CDR_Maint.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|


Select upload then select the CSV exported from your production host.

|

 .. image:: ../_static/images/fusionpbx/import_cdrs.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|


