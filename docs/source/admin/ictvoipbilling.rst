############################
Installing ictVoIP Billing
############################

**Complete Installation Guide for ictVoIP Billing System**

This guide provides step-by-step instructions for installing and configuring the ictVoIP Billing system on your WHMCS platform.

|

.. image:: ../_static/images/admin/ictvoip_billing_dashboard.png
        :scale: 45%
        :align: center
        :alt: ictVoIP Billing Dashboard
|

System Requirements
------------------

**Supported WHMCS Versions:**
* WHMCS 8.12+

**PHP Requirements:**
* PHP 8.1, 8.2, 8.3

**Web Server:**
* Apache 2.4+
* LiteSpeed
* Nginx (with proper configuration)

**Prerequisites:**
* WHMCS with HTTPS enabled
* Basic understanding of WHMCS administration
* Access to WHMCS admin panel

.. note::
   This guide assumes you have a basic WHMCS installation with HTTPS enabled and understand WHMCS platform administration.

Purchase & Download
------------------

**1. Purchase the Module**

If you haven't already purchased the ictVoIP Billing addon module, you can do so here:

`ictVoIP Billing Software <https://www.icttech.ca/index.php?rp=/store/ictvoip-billing-software>`_

**2. Download the Package**

Download the latest release package from your client area:
* **Package:** `ictvoip_billing_release-1.3.0_PHP8.1-8.3.zip`
* **Location:** Your client area licenses section

Installation Process
-------------------

**Step 1: Upload the Package**

Upload the ictVoIP Billing addon module zip file to your server:

.. code-block:: bash

   /home/$user/tmp/ictvoip_billing_release-1.3.0_PHP8.1-8.3.zip

**Step 2: Extract and Copy Files**

Uncompress the module and copy the contents to your WHMCS root installation:

.. code-block:: bash

   # Extract the package
   unzip ictvoip_billing_release-1.3.0_PHP8.1-8.3.zip
   
   # Copy files to WHMCS directories
   cp -r admin/* /home/$user/public_html/admin/
   cp -r images/* /home/$user/public_html/images/
   cp -r modules/addons/ictvoipbilling /home/$user/public_html/modules/addons/

**Required Directory Structure:**

.. code-block:: text

   /home/$user/public_html/admin/
   /home/$user/public_html/admin/lang
   /home/$user/public_html/admin/lang/overrides
   /home/$user/public_html/images/
   /home/$user/public_html/modules/addons/ictvoipbilling
   /home/$user/public_html/modules/addons/ictvoipbilling/Actions
   /home/$user/public_html/modules/addons/ictvoipbilling/Utility
   /home/$user/public_html/modules/addons/ictvoipbilling/crons
   /home/$user/public_html/modules/addons/ictvoipbilling/import
   /home/$user/public_html/modules/addons/ictvoipbilling/tariff

Database Setup
--------------

**Import Required Tables**

Import the Country Codes table to your WHMCS database:

.. code-block:: sql

   -- Import the country codes table
   mysql -u username -p database_name < mod_ictvoipbilling_country_codes.sql

.. note::
   Replace `username`, `database_name` with your actual WHMCS database credentials.

License Activation
-----------------

**Step 1: Access Addon Modules**

Navigate to your WHMCS admin panel:
* **System Settings** → **Apps & Integrations** → **Addon Modules**

**Step 2: Activate the Module**

1. Find "ictVoIP Billing" in the addon modules list
2. Click **Activate**
3. Click **Configure**

**Step 3: Enter License Key**

Enter your license key in the configuration:

.. code-block:: text

   License Key: LeasedictVoIP_a3174afbf93b3b8ba8f3

|

.. image:: ../_static/images/admin/addon_lic.png
        :scale: 50%
        :align: center
        :alt: Addon License Configuration
|

**Step 4: Configure Access Control**

Set the appropriate access control groups for your administrators and save the configuration.

Verification
-----------

**1. Check Module Status**

Verify the module is properly installed:
* Navigate to **System Settings** → **Apps & Integrations** → **Addon Modules**
* Ensure "ictVoIP Billing" shows as **Active**

**2. Test Admin Access**

* Navigate to **ictVoIP Billing** in your admin menu
* Verify you can access the dashboard
* Check that all menu items are visible

**3. Verify Database Tables**

Confirm the required tables were created:

.. code-block:: sql

   SHOW TABLES LIKE '%ictvoipbilling%';

Troubleshooting
--------------

**Common Issues:**

* **Module not appearing:** Check file permissions and ensure all files were copied correctly
* **License activation failed:** Verify the license key is correct and has not expired
* **Database errors:** Ensure the country codes table was imported successfully
* **Access denied:** Check that your admin user has the correct access control group assigned

**Support:**

If you encounter issues during installation, please contact our support team with:
* WHMCS version
* PHP version
* Error messages (if any)
* Steps taken during installation

Next Steps
----------

After successful installation, proceed to:

1. **Server Configuration** - Set up your PBX servers
2. **Provider Setup** - Configure your VoIP providers
3. **Tariff Management** - Set up your pricing structure
4. **Package Configuration** - Create service packages
