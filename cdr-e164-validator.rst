*********************************
CDR E.164 Validator
*********************************

**ictVoIP Billing Administration & Configuration**

The CDR E.164 Validator is a powerful tool integrated with the ictVoIP Billing system that validates Call Detail Records (CDRs) from FusionPBX to ensure proper E.164 international phone number formatting. This tool helps identify and fix CDR formatting issues that can affect billing accuracy and call routing.

Overview
========

The CDR E.164 Validator provides comprehensive validation of CDR data to ensure proper E.164 international phone number formatting. From initial setup to ongoing validation and troubleshooting, this section provides step-by-step guidance for administrators.

Key Features
===========

* **Live CDR Validation**: Real-time connection to FusionPBX for CDR data
* **International Country Code Support**: Automatic detection of product country codes
* **Smart Issue Detection**: Visual indicators for valid, wrong country, and invalid numbers
* **Copy-Paste Dialplan Commands**: Ready-to-use FusionPBX dialplan fixes
* **Direction-Aware Recommendations**: Separate handling for inbound and outbound calls
* **Auto-Population**: Automatic tenant detection from product configuration
* **Debug Mode**: Detailed technical information for troubleshooting

What is E.164?
==============

E.164 is the international standard for phone number formatting that includes:

* **Country Code**: 1 for North America, 44 for UK, 49 for Germany, etc.
* **National Number**: The local phone number without country code
* **Total Length**: 7-15 digits maximum

**Example**: ``+1-555-123-4567`` (E.164 format) vs ``555-123-4567`` (missing country code)

Installation & Setup
===================

System Requirements
------------------

* WHMCS with ictVoIP Billing addon installed
* FusionPBX server module configured
* Access to FusionPBX CDR class
* Proper database permissions

Access Configuration
-------------------

1. Navigate to your WHMCS admin panel
2. Go to **Addons** → **ictVoIP Billing**
3. Click on **CDR E.164 Validator**

Database Integration
-------------------

The validator integrates with the following database tables:

* ``mod_ictvoipbilling_country_codes``: Country code definitions
* ``mod_ictvoipbilling_extended_rates``: Product tariff configuration
* ``mod_ictvoipbilling_extended_rates_tariff``: Country code assignments
* ``tblhosting``: Product domain/tenant information

Configuration
=============

Product-Level Configuration
-------------------------

Country codes are automatically detected from your product's tariff configuration:

1. Go to **Products/Services** → **VoIP Product**
2. Configure **Extended Rates Tariff**
3. Set **Country Code** (e.g., 44 for UK, 1 for North America)
4. Save configuration

International Support
--------------------

The validator supports all international country codes and will:

* Validate against the product's configured country code
* Flag numbers with wrong country codes
* Provide appropriate dialplan fixes

Usage Guide
===========

Step 1: Select Parameters
------------------------

**Client**: Choose the client whose CDRs you want to validate
**Product**: Select the VoIP product (auto-populates tenant)
**Server**: Choose the FusionPBX server
**Tenant**: Domain/tenant (auto-populated from product selection)
**Extension**: Optional filter for specific extension
**Debug Mode**: Enable for detailed technical information

Step 2: Run Validation
---------------------

Click **"Run Validation"** to fetch and analyze CDRs from FusionPBX.

Step 3: Review Results
---------------------

The tool displays two tables:

* **All CDRs**: Complete list with validation status
* **Invalid CDRs**: Only problematic records requiring attention

Understanding the Results
========================

Color-Coded Rows
----------------

* **🟢 Green**: Valid CDRs (no issues)
* **🔵 Blue**: Inbound calls with issues
* **🟠 Orange**: Outbound calls with issues
* **🔴 Red**: Invalid CDRs

Issue Indicators
---------------

✅ Valid
~~~~~~~

Number is correctly formatted with proper country code.

⚠️ Wrong Country
~~~~~~~~~~~~~~~

Number has a country code, but it's not the expected one for your product.

**Example**: Product configured for UK (44) but number has US country code (1)

**Fix**: Hover for dialplan command to add correct country code

❌ Invalid
~~~~~~~~~~

Number doesn't follow E.164 format (missing country code, too short, etc.).

**Example**: ``5551234567`` (missing country code)

**Fix**: Hover for dialplan command to add country code

FusionPBX Integration
====================

Automatic Tenant Detection
-------------------------

The tool automatically detects the tenant (domain) from your product's hosting configuration, eliminating manual entry errors.

Direction-Aware Recommendations
-----------------------------

* **Inbound Calls**: Uses ``effective_caller_id_number`` variable
* **Outbound Calls**: Uses ``destination_number`` variable

Copy-Paste Dialplan Commands
---------------------------

Each issue includes a **"Copy Command"** button that provides the exact FusionPBX dialplan action needed:

.. code-block:: bash

   set effective_caller_id_number=1${caller_id_number}
   set destination_number=1${destination_number}

Troubleshooting
==============

Common Issues
-------------

"No CDRs Found"
~~~~~~~~~~~~~~~

* Verify tenant/domain is correct
* Check FusionPBX server connectivity
* Ensure CDR class path is accessible

"Could not find cdr_class.php"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Verify FusionPBX server module is installed
* Check file permissions on CDR class
* Ensure correct server path configuration

Tooltip Not Working
~~~~~~~~~~~~~~~~~~

* Ensure JavaScript is enabled
* Check for browser console errors
* Try refreshing the page

Debug Mode
----------

Enable **Debug Mode** to see:

* Raw CDR data from FusionPBX
* Country code detection process
* Request parameters sent to CDR class

Technical Details
================

CDR Class Integration
--------------------

The tool integrates with the FusionPBX CDR class to:

* Fetch live CDR data
* Filter by tenant and extension
* Process call direction information

Validation Logic
---------------

1. **Country Code Detection**: Matches number against all country codes
2. **Priority Matching**: Prioritizes common countries (US, UK, etc.)
3. **Length Validation**: Ensures 7-15 digit total length
4. **Product Code Comparison**: Flags mismatched country codes

Benefits
========

For Billing Accuracy
-------------------

* Ensures proper E.164 formatting for accurate rate lookup
* Prevents billing errors from malformed numbers
* Validates international call routing

For System Administrators
-------------------------

* Quick identification of CDR formatting issues
* Ready-to-use FusionPBX dialplan fixes
* Comprehensive validation across all country codes

For Support Teams
----------------

* Clear visual indicators of issues
* Detailed explanations for non-technical users
* Copy-paste solutions for immediate implementation

Best Practices
=============

Configuration Best Practices
---------------------------

* Set appropriate country codes for each product
* Regularly validate CDRs for new clients
* Use debug mode for initial setup verification
* Monitor for patterns in formatting issues

Maintenance Best Practices
-------------------------

* Run validation after FusionPBX configuration changes
* Check CDRs when adding new country codes
* Validate before major billing runs
* Document any custom dialplan changes

Next Steps
==========

After setting up the CDR E.164 Validator:

1. **Configure Product Country Codes**: Ensure all VoIP products have proper country codes set
2. **Validate Existing CDRs**: Run validation on existing clients to identify issues
3. **Implement Dialplan Fixes**: Use the provided commands to fix FusionPBX dialplans
4. **Monitor Regularly**: Set up regular validation checks for new CDRs
5. **Train Support Team**: Ensure support staff understand the validation indicators

Version History
==============

Version 1.0
-----------

* Initial release
* Live CDR validation from FusionPBX
* International country code support
* Copy-paste dialplan commands
* Direction-aware recommendations
* Auto-population of tenant from product
* Debug mode for troubleshooting

---

*This tool is specifically designed for use with the ictVoIP Billing system and FusionPBX integration.* 