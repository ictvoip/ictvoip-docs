FusionPBX Installation Guide
===========================

Overview
--------

This guide covers the installation of ictVoIP Billing integration with FusionPBX systems. The installation process varies depending on your FusionPBX version and deployment method.

Prerequisites
-------------

Before installing the ictVoIP Billing integration, ensure you have:

* **FusionPBX v5.3.x** (recommended) or v5.1.x
* **FusionPBX FQDN** for main host with SSL Cert applied 
* **WHMCS v8+** installed and configured
* **Root access** to your FusionPBX server
* **PostgreSQL database** access
* **nginx** or **Apache** web server
* **PHP 8.2+** with required extensions (PHP 8.3+ under development)
* **ionCube Loader v12+** at minimum.

System Requirements
-------------------

* **Operating System**: Debian 12+ (recommended)
* **PHP**: Current 8.1+ with FPM (PHP 8.3+ under development)
* **Database**: PostgreSQL 12+
* **Web Server**: nginx (recommended)
* **Memory**: Minimum 2GB RAM (depending on your production environment needs adjust)
* **Storage**: 50GB+ available space (depending on your production environment needs adjust)

Installation Methods
--------------------

You can install using the automated script (recommended), manually, or in Docker.

Automated Installation
----------------------

The recommended installation method uses our automated installer scripts.

Step 1: Download Installation Package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # Download the ictVoIP FusionPBX Server Module 
    # Note: All custom FPBX scripts will be inside your module.
    unzip ictvoip_fpbx_apis.zip
    cd ictvoip_fpbx_apis

Step 2: Install API Customizations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # Install API endpoints
    sudo chmod +x install_apis.sh
    sudo ./install_apis.sh

Step 3: Install Theme Customizations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # Install theme and branding (Optional)
    chmod +x install_theme.sh
    sudo ./install_theme.sh

Step 4: Verify Installation
~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # Check API endpoints
    Within WHMCS Server Edit setting click the Test connection button (you must have whitelisted your WHMCS IP first)

    # Check login page
    # Visit: https://your-fusionpbx.com/

Manual Installation
-------------------

For custom deployments or when automated installation is not suitable.

Step 1: Backup Existing System
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # Create backup of current FusionPBX
    sudo cp -r /var/www/fusionpbx /backup/fusionpbx_$(date +%Y%m%d_%H%M%S)

Step 2: Install API Files
~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # Copy API customizations
    sudo cp -r apis/var/www/fusionpbx/app/* /var/www/fusionpbx/app/

    # Set permissions
    sudo chown -R www-data:www-data /var/www/fusionpbx/app/
    sudo find /var/www/fusionpbx/app/ -type f -exec chmod 644 {} \;
    sudo find /var/www/fusionpbx/app/ -type d -exec chmod 755 {} \;

Step 3: Install Theme Files
~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # Copy theme customizations
    sudo cp -r themes/var/www/fusionpbx/* /var/www/fusionpbx/

    # Set permissions
    sudo chown -R www-data:www-data /var/www/fusionpbx/themes/
    sudo chown -R www-data:www-data /var/www/fusionpbx/core/authentication/

Step 4: Configure Database (for Custom Login Page)
~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # Set custom login template
    sudo -u postgres psql fusionpbx << EOF
    INSERT INTO v_default_settings (
        default_setting_uuid, 
        default_setting_category, 
        default_setting_subcategory, 
        default_setting_name, 
        default_setting_value, 
        default_setting_order, 
        default_setting_enabled, 
        default_setting_description
    ) VALUES (
        gen_random_uuid(),
        'theme',
        'login',
        'login_template',
        'loginictvoip.htm',
        100,
        'true',
        'Custom ictVoIP login template'
    ) ON CONFLICT (default_setting_category, default_setting_subcategory, default_setting_name)
    DO UPDATE SET
        default_setting_value = EXCLUDED.default_setting_value,
        default_setting_enabled = EXCLUDED.default_setting_enabled;
    EOF

Step 5: Restart Services
~~~~~~~~~~~~~~~~~~~~~~~

::

    # Restart web server and PHP
    sudo systemctl restart nginx
    sudo systemctl restart php8.2-fpm

    # Clear caches
    sudo rm -rf /tmp/fusionpbx_cache/*
    sudo rm -rf /tmp/fusionpbx_sessions/*

Docker Installation
-------------------

For containerized deployments.

Step 1: Create Dockerfile
~~~~~~~~~~~~~~~~~~~~~~~~~

::

    FROM fusionpbx/fusionpbx:latest

    # Copy ictVoIP customizations
    COPY ictvoip_fpbxv5-3_customizations/ /tmp/customizations/

    # Install customizations
    RUN cp -r /tmp/customizations/apis/var/www/fusionpbx/app/* /var/www/fusionpbx/app/ && \
        cp -r /tmp/customizations/themes/var/www/fusionpbx/* /var/www/fusionpbx/ && \
        chown -R www-data:www-data /var/www/fusionpbx/ && \
        chmod -R 755 /var/www/fusionpbx/

Step 2: Build and Run
~~~~~~~~~~~~~~~~~~~~~

::

    # Build custom image
    docker build -t ictvoip-fusionpbx .

    # Run container
    docker run -d \
      --name fusionpbx \
      -p 80:80 \
      -p 443:443 \
      -e DB_HOST=your-db-host \
      -e DB_NAME=fusionpbx \
      -e DB_USER=fusionpbx \
      -e DB_PASS=your-password \
      ictvoip-fusionpbx

Post-Installation Verification
------------------------------

After installation, verify the following:

1. Check API Endpoints
~~~~~~~~~~~~~~~~~~~~~~

::

    # Test status API
    Within WHMCS add Server Status and refresh (make sure to use the current WHMCS version from status/index.php)

    # Test registration API
    curl -X POST https://your-fusionpbx.com/app/registrations/check_registration.php \
      -d "username=admin&password=your-password&extension=1001&tenant_domain=yourdomain.com"

2. Verify Theme Installation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Visit your FusionPBX login page
* Should display ictVoIP branding
* Custom login template should be active
* Logos and styling should be applied

3. Check Database Settings
~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # Verify login template setting
    sudo -u postgres psql fusionpbx -c "
    SELECT default_setting_name, default_setting_value, default_setting_enabled 
    FROM v_default_settings 
    WHERE default_setting_name = 'login_template';"

4. Test WHMCS Integration (Optional)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* **Note**: WHMCS integration requires the separate ictsipreg WHMCS module addon
* Configure WHMCS module settings (if ictsipreg module is installed)
* Test gateway provisioning
* Verify CDR collection
* Check billing automation

Troubleshooting Installation
---------------------------

Common Issues
~~~~~~~~~~~~~

Permission Errors
^^^^^^^^^^^^^^^^

::

    # Fix ownership
    sudo chown -R www-data:www-data /var/www/fusionpbx/

    # Fix permissions
    sudo find /var/www/fusionpbx/ -type f -exec chmod 644 {} \;
    sudo find /var/www/fusionpbx/ -type d -exec chmod 755 {} \;

Database Connection Issues
^^^^^^^^^^^^^^^^^^^^^^^^^

::

    # Test PostgreSQL connection
    sudo -u postgres psql fusionpbx -c "SELECT 1;"

    # Check database settings
    sudo -u postgres psql fusionpbx -c "\l"

Service Restart Failures
^^^^^^^^^^^^^^^^^^^^^^^

::

    # Check service status
    sudo systemctl status nginx
    sudo systemctl status php8.2-fpm

    # Check logs
    sudo journalctl -u nginx -f
    sudo journalctl -u php8.2-fpm -f

Theme Not Loading
^^^^^^^^^^^^^^^^

::

    # Clear browser cache
    # Use incognito mode
    # Check file permissions
    ls -la /var/www/fusionpbx/themes/default/images/

Next Steps
----------

After successful installation:

1. **Configure WHMCS Integration** - Set up the WHMCS module (optional)
   * Note: The ictsipreg WHMCS module is a separate optional addon
   * Contact ictVoIP for WHMCS module installation and licensing
2. **Set Up API Credentials** - Configure authentication
3. **Test All Endpoints** - Verify API functionality
4. **Customize Branding** - Adjust logos and styling
5. **Set Up Monitoring** - Configure health checks

For detailed configuration instructions, see the :doc:`configuration` guide.

For WHMCS integration setup, see the WHMCS module documentation.
