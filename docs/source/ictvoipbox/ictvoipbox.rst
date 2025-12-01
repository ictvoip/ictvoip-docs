************
ictVoIP Box
************

Getting Started
***************

.. note::
   Updated: Client Side facing provisioning Addon with custom chckout ordering system.


|

Once you have installed the addon feature for your FusionPBX ictVoIP Billing module you can then create a new Provider for Selling DIDs and provisioning Gateways via our template manager.

To begin create your Provider.


|

 .. image:: ../_static/images/admin/ictvoipbox_main.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|


Configure the settings for your Provider


|

 .. image:: ../_static/images/admin/ictvoipbox_provider_setting.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|


Checkout API Setting
*********************

Set your Provider API settings and include the Countries you wish to offer provisioning for.

|

 .. image:: ../_static/images/admin/ictvoipbox_api_settings.png
        :scale: 45%
        :align: center
        :alt: Package Rates
        
|





Product Mapping
***************

.. note::
   Updated: Improved mapping for groups and individual products to be assigned to checkout ordering.


|

Currently supports Importing of CDRs Exported from v5.0.x, 5.1.x, 5.2.x and 5.3.x and allows the importing of these CDRs based on Tenant/Extension by Extension or all.
If importing from tenant accounts extension then you must at minimum create the extension(s) which you require CDR details. The tenant (domain) should match from the exported FPBX host from where the CDRs have been exported.
Once you have the tenant and extensions configured to import then select the tenant then extension to begin.


|

 .. image:: ../_static/images/admin/ictvoipbox_prod_mapping.png
        :scale: 45%
        :align: center
        :alt: Import Tool
        
|



Template Assignments
********************

The import tool also comes with a custom selective export tool which allows the selection of the tenant, all extensions or individual extensions by date range.

|

 .. image:: ../_static/images/fusionpbx/export_1.png
        :scale: 45%
        :align: center
        :alt: Import Tool
        
|

