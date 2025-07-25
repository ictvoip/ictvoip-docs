*********************************
ictVoIP Billing Management
*********************************

Add new Provider/PBX - This name will link your Tariff and Package rates. 
Some formatting would be as follows:
- PBX Vendor - Provider Tariff - Region or Custom

i.e. [FusionPBX - Telnyx - New York] - custom rates could then be applied to New York state or only for the selected prefixes.

i.e. [FusionPBX - AQL - India] - custom rate for flat rates which a package could be assigned as metered minutes (1000 minutes).

i.e. [FusionPBX - Telnyx - Global] - no custom rates and all prefixes will billed with Global Markup.

This naming convention will allow you to place packages assigned to the FusionPBX server module and allow for custom rates for a particular region.

.. toctree::
   :maxdepth: 3
   :glob:

   admin/providers.rst
   admin/tariffs.rst
   admin/packages.rst
   admin/servers.rst
   admin/cdr-e164-validator.rst
  
