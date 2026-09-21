Installation & Configuration
============================

.. contents::
   :local:
   :depth: 2

Installing ictVoIP Box
----------------------

The ictVoIP Box addon includes the following components:

**1. Addon Module**
   * Core addon logic and admin interface
   * Provisioning actions and queue management
   * AJAX handlers for real-time updates

**2. Shopping Cart Hooks**
   * Checkout processing integration
   * Regulatory information collection
   * Email template merge fields

**3. Custom Order Form Template**
   * Custom checkout cart for ictVoIP Box products
   * DID selection interface
   * Regulatory information forms (DIDWW)

**4. Provider API Integration**
   * Provider API integration for DID ordering
   * Account management functions
   * Rate and inventory retrieval

Installation Steps
------------------

**Step 1: Install ictVoIP Box Package**

1. Upload the ictVoIP Box installation package provided by ictVoIP Canada
2. Follow the installation wizard or manual installation instructions provided
3. Ensure all required components are installed:

   * Addon module
   * Shopping cart hooks
   * Custom order form template
   * Provider API integration

**Step 2: Assign Template to Product Groups**

1. Navigate to **Setup → Products/Services → Product Groups**
2. Edit the product group containing ictVoIP Box products
3. In **Order Form Template** dropdown, select ``ictvoipbox_cart``
4. Click **Save Changes**
5. All products in this group will now use the custom checkout cart

**Step 3: Activate ictVoIP Box Addon**

1. Navigate to **Setup → Addon Modules** in WHMCS admin
2. Locate **ictVoIP Box** in the addon list
3. Click **Activate**
4. Enter your license key
5. Configure access control:

   * Select admin roles that can access ictVoIP Box
   * Recommended: Full Administrator, ictVoIP Admin

6. Click **Save Changes**

|

.. image:: ../_static/images/admin/activate_ictvoipbox_addon.png
   :width: 600px
   :align: center
   :alt: ictVoIP Box Installation

|

Initial Configuration
---------------------

Configure Provider Credentials
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Navigate to **Addons → ictVoIP Box → Provider Settings** tab

Each provider has different configuration fields for API authentication:

**VoIP.ms Configuration:**
   * **API Username**: Your VoIP.ms API username
   * **API Password**: Your VoIP.ms API password
   * **Account Number**: Your VoIP.ms main account number
   * **Sandbox Mode**: Optional (VoIP.ms supports both sandbox and production)
   * **Status**: Production-ready (can be used for live orders)

**DIDWW Configuration:**
   * **API Key**: Your DIDWW API key
   * **Sandbox Mode**: ⚠️ **MUST be enabled** (sandbox only until fully tested)
   * **Portal URL**: DIDWW portal URL for document uploads (sandbox URL)
   * **Status**: Alpha testing only - do not use production API key

.. warning::
   Use **sandbox mode for DIDWW** until production testing is complete. VoIP.ms can be configured for production use.

.. important::
   * Each provider's settings are independent
   * API credentials are encrypted in database
   * Test connectivity after saving credentials

|

.. image:: ../_static/images/admin/ictvoipbox_provider_settings.png
   :width: 600px
   :align: center
   :alt: Provider Settings Configuration

|

Create WHMCS Products
^^^^^^^^^^^^^^^^^^^^^

Navigate to **Setup → Products/Services → Products/Services**

Create products for:

* **VoIP.ms DIDs**: Link to VoIP.ms
* **DIDWW DIDs**: Link to DIDWW
* **Extension Packages**: Additional extensions (seats)
* **Feature Add-ons**: Call recording, etc.

**Product Configuration:**
   * Module: ``ictvoipbox``
   * Product Type: ``Other``
   * Number of Seats: based on per product config


