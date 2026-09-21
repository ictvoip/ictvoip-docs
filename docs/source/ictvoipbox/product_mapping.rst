Product Mapping Configuration
=============================

.. contents::
   :local:
   :depth: 2

Overview
--------

Navigate to **Addons → ictVoIP Box → Product Mappings** tab

Product mapping links WHMCS products and bundles to providers (VoIP.ms or DIDWW). This determines which provider's API and settings are used during checkout and provisioning.

**How Product Mapping Works:**

When a customer orders a product:

1. System checks product mapping to determine provider
2. Checkout uses provider-specific settings (DID countries, rates, regulatory requirements)
3. Order is queued for provisioning with correct provider
4. Admin provisions using provider's API

**Mapping Priority (Highest to Lowest):**

1. **Product Group Mapping** - All standalone products in group assigned to same provider
2. **Individual Product Mapping** - Specific product assigned to provider
3. **Bundle Mapping** - Bundle and all constituent products assigned to provider

|

.. image:: ../_static/images/admin/ictvoipbox_prod_mapping.png
   :width: 600px
   :align: center
   :alt: Product Mappings Interface

|

Three Mapping Methods
---------------------

Method 1: Bulk Assign by Bundle
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Recommended for Mixed Groups**

Use this to assign a bundle and ALL its constituent products to the same provider, even if products are spread across multiple product groups.

**Steps:**

1. Locate bundle in "Bulk Assign by Bundle" section
2. Select provider from dropdown (VoIP.ms or DIDWW)
3. Click "Save Bundle Mappings"
4. System maps bundle + all products within bundle

**When to Use:**

* Bundle contains products from multiple product groups
* Want all bundle products to use same provider
* Simplifies management of complex bundles

**Example:**

* Bundle: "Complete PBX Package"
* Contains: US DID (Group A) + Extensions (Group B) + Features (Group C)
* Map bundle to VoIP.ms → All 3 products use VoIP.ms

Method 2: Bulk Assign by Product Group
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use this to quickly assign all standalone products in a product group to the same provider.

**Steps:**

1. Locate product group in "Bulk Assign by Product Group" section
2. Select provider from dropdown (VoIP.ms or DIDWW)
3. Click "Save Group Mappings"
4. System maps all standalone products in group (excludes bundle products)

**When to Use:**

* All products in group should use same provider
* Products are not part of bundles
* Quick bulk assignment needed

.. note::
   Only affects standalone products (not products within bundles). Bundle products must be mapped via bundle or individual mapping.

**Example:**

* Product Group: "Domestic DIDs"
* Contains: US DID, CA DID, UK DID (all standalone)
* Map group to VoIP.ms → All 3 DIDs use VoIP.ms

Method 3: Individual Product Mappings
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use this for granular control over individual products and bundles.

**Steps:**

1. Use filter dropdown to select product group or "Bundles"
2. Locate product/bundle in DataTable
3. Select provider from dropdown in "Assigned Provider" column
4. Click "Save Product Mappings"

**DataTable Columns:**

* **Product ID**: WHMCS product ID or ``bundle_X`` for bundles
* **Product Name**: Product/bundle name with indicators (HIDDEN, BUNDLE)
* **Product Group**: Product group name or "Bundles"
* **Assigned Provider**: Dropdown to select VoIP.ms, DIDWW, or "No Provider (Use Default)"
* **Status**: Badge showing mapping status (Default, Mapped, Invalid)

**Status Badges:**

* **Default** (gray): No provider assigned
* **Mapped** (green): Assigned to VoIP.ms
* **Mapped** (green): Assigned to DIDWW
* **Invalid** (yellow): Provider ID invalid (provider deleted)

**When to Use:**

* Override group mapping for specific product
* Map individual products not in groups
* Fine-tune provider assignments
* Map bundles individually

|

.. image:: ../_static/images/admin/ictvoipbox_individual_product_maps.png
   :width: 600px
   :align: center
   :alt: Individual Product Mappings DataTable

|

Critical Requirements
---------------------

.. danger::
   **IMPORTANT: Products without mapping will NOT function within the ictVoIP Box framework:**
   
   * **Will NOT be recognized** by the ictVoIP Box system
   * **Will NOT be part of checkout process** for provisioning
   * **Will NOT trigger** DID selection or regulatory forms
   * **Will FAIL** order validation and provisioning
   * **Only select products created specifically for ictVoIP Box use**

Every product intended for ictVoIP Box MUST be mapped to a provider (VoIP.ms or DIDWW). Products without provider mapping are invisible to the ictVoIP Box framework and cannot be provisioned.

Best Practices
--------------

✅ **Recommended Practices:**

* Use bundle mapping for bundles with products across multiple groups
* Use group mapping for simple product groups
* Use individual mapping for exceptions and overrides
* Verify mappings after bulk operations
* Test checkout after mapping changes

**Provider Selection Guidelines:**

**VoIP.ms Products:**
   * US and Canadian DIDs
   * Non-regulatory countries
   * Production-ready (sandbox or live)

**DIDWW Products:**
   * International DIDs (South Africa, EU, UK, etc.)
   * Regulatory countries requiring verification
   * ⚠️ **Sandbox mode only** during alpha testing
   * Do not use production API key yet

