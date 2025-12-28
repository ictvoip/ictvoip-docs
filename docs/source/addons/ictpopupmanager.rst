ictPopup Manager
=================

Overview
--------

The **ictPopup Manager** addon enables WHMCS administrators to create and manage client-facing alert banners and sales overlay popups across WHMCS templates. With advanced targeting, scheduling, and professional design presets, you can deliver timely messages to specific customer segments.

.. note::

   **Current Version**: 1.1.0  
   **Compatibility**: WHMCS 8.0+, PHP 7.4+

Features
--------

* **🎨 8 Professional Style Presets** - Pre-configured gradient backgrounds ready for immediate use
* **🎯 Advanced Targeting** - Target by products, product groups, or specific pages (homepage, login, cart, contact, knowledgebase)
* **📅 Flexible Scheduling** - Set start/end dates and times, optional time-of-day restrictions
* **✨ Animation Effects** - Choose from fade, slide (up/down/left/right), and zoom animations
* **🖼️ Image Support** - Add images with flexible positioning (left, right, top, bottom)
* **📝 Rich Content Editor** - TinyMCE WYSIWYG editor for formatted popup content
* **👁️ Live Preview** - Real-time preview with animations in the admin modal
* **🎭 Multiple Popup Types** - Mixed content, image-only, or text-only popups
* **📊 Display Limits** - Control display frequency per client or total displays
* **⏱️ Delay Timer** - Set delay before popup appears on page load
* **📱 Responsive Design** - Mobile-friendly popups with customizable sizes

Installation
------------

1. **Upload Files**

   Upload the ``ictpopupmanager`` folder to:
   
   .. code-block:: text
   
      /modules/addons/ictpopupmanager/

2. **Activate Addon**

   Navigate to **Setup > Addon Modules** in WHMCS admin and activate **ictPopup Manager**.

3. **Verify Installation**

   - 8 default style presets are automatically created on first activation
   - Database tables are created automatically
   - Access the addon at **Addons > ictPopup Manager**

Configuration
-------------

Default Style Presets
~~~~~~~~~~~~~~~~~~~~~

The addon includes 8 professional gradient style presets:

* **Dark Slate** - Professional dark gradient (slate to midnight)
* **Ocean Blue** - Vibrant blue gradient (sky to deep ocean)
* **Emerald Green** - Fresh green gradient (emerald to forest)
* **Purple Haze** - Rich purple gradient (violet to deep purple)
* **Sunset Orange** - Warm orange gradient (amber to deep orange)
* **Rose Pink** - Elegant pink gradient (rose to deep pink)
* **Midnight Blue** - Deep blue gradient (indigo to navy)
* **Teal Wave** - Cool teal gradient (cyan to deep teal)

These presets are available immediately in the **Look And Feel** tab when creating or editing popups.

Creating a Popup
~~~~~~~~~~~~~~~~

1. Navigate to **Addons > ictPopup Manager**
2. Click **Add New Popup**
3. Configure the following tabs:

**General Tab**
   * **Title** - Internal name for the popup
   * **Status** - Enable or disable the popup
   * **Load Settings From** - Copy settings from existing popup (new popups only)

**Content Tab**
   * **Content HTML** - Use TinyMCE editor to create formatted content
   * **Image Upload** - Optional image with position selection
   * **Image Position** - Left, Right, Top, or Bottom

**Look And Feel Tab**
   * **Background Style Presets** - Select from 8 default styles or create custom
   * **Animation Type** - Fade, Slide Up/Down/Left/Right, or Zoom
   * **Animation Duration** - Milliseconds (default: 650ms)
   * **Popup Style** - Center overlay (more styles coming soon)
   * **Size Mode** - Auto or Custom (set width/height)

**Restrictions Tab**
   * **Template Target** - Specific WHMCS template (optional)
   * **Target Areas** - Homepage, Login, Contact, Cart/Checkout, Knowledgebase
   * **Target Products** - Specific products
   * **Target Product Groups** - Entire product groups

**Timing Tab**
   * **Start Date/Time** - When popup becomes active
   * **End Date/Time** - When popup expires
   * **Time Range** - Optional daily time restrictions (e.g., 9am-5pm)
   * **Delay Time** - Seconds before popup appears
   * **Display Limits** - Per-client or total display limits

4. Click **Preview** to see the popup with animations
5. Click **Save** to activate

Managing Style Presets
~~~~~~~~~~~~~~~~~~~~~~~

Navigate to **Addons > ictPopup Manager > Styles** tab:

* **View All Presets** - See all available style presets
* **Add New Style** - Create custom background styles
* **Edit Style** - Modify existing presets
* **Delete Style** - Remove unused presets

Custom styles use CSS background properties:

.. code-block:: css

   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

Usage Examples
--------------

Holiday Sale Popup
~~~~~~~~~~~~~~~~~~

Create a time-limited sale announcement:

* **Title**: "Holiday Sale 2024"
* **Content**: "🎄 Save 30% on all VoIP plans! Use code HOLIDAY30"
* **Style Preset**: Sunset Orange
* **Animation**: Slide Down
* **Target Areas**: Homepage, Cart
* **Schedule**: Dec 20 - Dec 31
* **Time Range**: 9:00 AM - 9:00 PM

Maintenance Alert
~~~~~~~~~~~~~~~~~

Notify customers of scheduled maintenance:

* **Title**: "Maintenance Notice"
* **Content**: "⚠️ Scheduled maintenance: Dec 28, 2:00 AM - 4:00 AM EST"
* **Style Preset**: Dark Slate
* **Animation**: Fade
* **Target Areas**: All pages
* **Schedule**: Dec 27 - Dec 28
* **Display Limit**: 3 per client

Product-Specific Upsell
~~~~~~~~~~~~~~~~~~~~~~~

Target customers viewing specific products:

* **Title**: "VoIP Add-on Promotion"
* **Content**: "📞 Add international calling for just $5/month!"
* **Style Preset**: Ocean Blue
* **Animation**: Zoom
* **Target Products**: Basic VoIP Plan
* **Delay**: 5 seconds

Troubleshooting
---------------

Popup Not Appearing
~~~~~~~~~~~~~~~~~~~

1. **Check Status** - Ensure popup is set to "Enabled"
2. **Verify Schedule** - Check start/end dates are current
3. **Review Restrictions** - Confirm target areas/products match current page
4. **Clear Cache** - Hard refresh browser (Ctrl+F5)
5. **Check Display Limits** - Verify limits haven't been reached

Animations Not Working
~~~~~~~~~~~~~~~~~~~~~~

1. **Hard Refresh** - Clear browser cache (Ctrl+F5)
2. **Check Browser** - Ensure modern browser with CSS animation support
3. **Preview Modal** - Test animations in admin preview first

Style Presets Missing
~~~~~~~~~~~~~~~~~~~~~

If default style presets don't appear after activation:

1. Deactivate the addon
2. Reactivate the addon (presets are inserted on activation)
3. Refresh the page

Technical Details
-----------------

Database Tables
~~~~~~~~~~~~~~~

The addon creates two database tables:

* ``mod_ictpopupmanager_popups`` - Stores popup configurations
* ``mod_ictpopupmanager_style_presets`` - Stores reusable style presets

Client-Side Integration
~~~~~~~~~~~~~~~~~~~~~~~

Popups are automatically injected into WHMCS client area pages based on configured targeting rules. No manual template modifications are required.

Changelog
---------

Version 1.1.0 (2024-12-27)
~~~~~~~~~~~~~~~~~~~~~~~~~~

**New Features:**

* Added 8 professional default style presets on activation
* Improved modal opening reliability with error handling
* Enhanced DataTables view with optimized column widths
* Status cards now display actual values in Styles view

**Improvements:**

* Removed Template column from DataTables for cleaner UI
* Limited Targets column width to 200px with word-wrap
* Reduced Actions column width to single row
* Fixed modal closing issue when creating new popups
* Enhanced animation preview functionality

**Bug Fixes:**

* Fixed status cards showing "-" in Styles view
* Resolved Bootstrap modal conflict causing premature closing
* Improved error handling in modal JavaScript

Version 1.0.0 (2024-12-26)
~~~~~~~~~~~~~~~~~~~~~~~~~~

* Initial release
* Core popup management functionality
* Advanced targeting and scheduling
* TinyMCE content editor
* Image upload and positioning
* Animation effects
* Live preview

Support
-------

For support, documentation, or feature requests, please visit the product support page.

Requirements
------------

* **WHMCS**: 8.0 or higher
* **PHP**: 7.4 or higher
* **MySQL**: 5.7 or higher / MariaDB 10.3 or higher
* **Web Server**: Apache, Nginx, or LiteSpeed
