*************
Quick Install
*************

.. image:: ../_static/images/document_logo.png
   :scale: 80%

|

.. tip::

   **Upgrading an existing installation?** See :doc:`/upgrades` for the
   recommended upgrade procedure covering the ictVoIP Billing addon,
   FusionPBX server module, and API files.

Welcome to the ictVoIP Billing installation quick guide for WHMCS.

This guide walks you through a standard deployment of the ictVoIP Billing addon and server modules on a fresh WHMCS installation. It is designed to get you from zero to a working system in under 30 minutes.

For advanced configuration and provisioning guides, please refer to the **System Administration** and **Server Modules** sections.

Supported Versions
==================

.. note::

   This Quick Install guide applies to **ictVoIP Billing v1.4.0** and later.

**Recommended environment:**

* **WHMCS:** 8.13.x or WHMCS v9
* **PHP:** 8.1.x – 8.3.x
* **ionCube Loader v14**
* **Web Server:** Apache or LiteSpeed with HTTPS enabled

For older ictVoIP Billing versions or non‑standard environments, please refer to the archived documentation or contact support.

Installation Checklist
======================

Follow these steps in order:

1. Prepare your WHMCS environment
2. Upload the ictVoIP Billing package
3. Extract and merge the files into your WHMCS root
4. Activate the ictVoIP Billing addon in WHMCS
5. Run the System Health Check
6. Configure your first provider and server module

Step 1: Prepare Your Environment
================================

Before installing ictVoIP Billing, verify:

* WHMCS is installed and reachable over HTTPS.
* You can log in as a WHMCS administrator.
* You have SFTP/SSH or file manager access to the WHMCS document root.
* PHP and WHMCS versions match the **Supported Versions** above.

Step 2: Upload the Package
==========================

1. Log in to your ictVoIP client area.
2. Navigate to your license and download the latest release package:

   * **Package name:** ``ictvoip_billing_release-1.4.x_PHP8.1-PHP8.3.zip``

3. Upload the package to a temporary directory on your server, for example:

   .. code-block:: bash

      /home/$user/tmp/ictvoip_billing_release-1.4.x_PHP8.1-PHP8.3.zip

Step 3: Extract and Merge Files
===============================

From an SSH shell or file manager:

1. Change to the temporary directory containing the ZIP file.
2. Extract the archive:

   .. code-block:: bash

      cd /home/$user/tmp
      unzip ictvoip_billing_release-1.4.x_PHP8.1-PHP8.3.zip

3. The extracted package contains a top‑level ``WHMCS/`` directory.  
   Copy its contents into your WHMCS document root (for example ``/home/$user/public_html``), preserving the directory structure:

   .. code-block:: bash

      cp -r WHMCS/* /home/$user/public_html/

This will deploy the ictVoIP Billing addon, language files, images, and required cron scripts into the correct WHMCS directories.

Step 4: Activate the ictVoIP Billing Addon
==========================================

1. Log in to your WHMCS admin area.
2. Navigate to:

   * **System Settings** → **Apps & Integrations** → **Addon Modules**

3. Locate **ictVoIP Billing** in the list.
4. Click **Activate**.
5. Click **Configure** and enter your license key from the client area.
6. Assign the appropriate admin access control groups.
7. Save the configuration.

.. note::

   **Upgrading from v1.3.3:** When upgrading from ictVoIP Billing v1.3.3 (or any 1.3.x build) to v1.4.0 or later, you must re-run the addon activation inside WHMCS after uploading the new files. If the addon is already active, click **Deactivate**, then **Activate** again. This ensures that all new database tables and columns required by the new version are created and updated.

For more details, including screenshots, see :doc:`/admin/ictvoipbilling`.

Database Initialization
=======================

When the ictVoIP Billing addon is activated for the first time, it will automatically create and initialize the required database tables, including country codes and configuration tables.

If you are upgrading from ictVoIP Billing v1.3.3 (or any 1.3.x build) to v1.4.0 or later, this same activation step must be allowed to run again so the upgrade routines can add new tables and update existing structures. After copying the new files, re-open **System Settings → Apps & Integrations → Addon Modules**, then **Deactivate** and **Activate** the ictVoIP Billing addon to trigger the database upgrade.

You can confirm that the tables exist using your MySQL administration tool or CLI:

.. code-block:: sql

   SHOW TABLES LIKE '%ictvoipbilling%';

If activation fails to create the tables (for example, due to database permissions), you can manually import the SQL file included in the release package using your preferred database management tool.

Step 5: Run the System Health Check
===================================

After activation:

1. In the WHMCS admin menu, open **ictVoIP Billing**.
2. Navigate to the **System Health Check** page.

The health check verifies that:

* Required database tables are present.
* Cron scripts are accessible.
* Core addon and server module files are in place.

All checks should display **OK** before proceeding to production.

If any checks fail, review the associated message and refer to the troubleshooting section in :doc:`/admin/ictvoipbilling`.

Step 6: Next Steps – Providers and Server Modules
=================================================

With the addon installed and verified, the next steps are:

* Configure your first **Provider**  
  See :doc:`/admin/providers` for details on provider naming, tariff linking, and rate management.

* Add and configure a **Server Module** (e.g. FusionPBX, Vodia)  
  See the **Server Modules** section for module‑specific installation and configuration:

  * :doc:`/modules/fusionpbx`
  * :doc:`/modules/vodia`

Once your providers and server modules are configured, you can begin creating packages and provisioning client services.

.. seealso::

   For future upgrades and maintenance procedures, see :doc:`/upgrades`.