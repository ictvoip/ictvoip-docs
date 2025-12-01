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

Assign default template Routes for checkout provisioning

1. Navigate to **Addons → ictVoIP Box → Route Templates**
2. Review available Inbound and Outbound templates
3. Select default templates per provider:
   - **Inbound Routes** - For DID routing to extensions
   - **Outbound Routes** - For outbound calling configuration

|

 .. image:: ../_static/images/admin/ictvoipbox_template_routes.png
        :scale: 45%
        :align: center
        :alt: Import Tool
        
|

Setup your default Gateway template for checkout provisioning.

1. Navigate to **Addons → ictVoIP Box → Gateway Templates**
2. Review available templates from ictvoipbilling
3. Select default gateway template per provider
4. Templates support dynamic variables:
   - `{username}` - VoIP.ms sub-account username
   - `{password}` - VoIP.ms sub-account password
   - `{from_user}` - SIP From User
   - `{from_domain}` - Tenant domain
   - `{context}` - Server IP address
   - `{description}` - Tenant description


|

 .. image:: ../_static/images/admin/ictvoipbox_templates_gateway.png
        :scale: 45%
        :align: center
        :alt: Import Tool
        
|

