PHP Requirements & Health Check
###############################

**Official site:** https://www.php.net/

The ictVoIP Billing addon includes a built-in **Health Check**
(``/modules/addons/ictvoipbilling/healthcheck.php``) that validates the
PHP environment on the WHMCS host before and during operation. Use this
guide to configure PHP so the Health Check returns positive results and
large operations such as tariff imports and Autobill runs do not time
out.

.. note::

   These settings apply to the **WHMCS host** running the ictVoIP
   Billing addon and server modules — not the FusionPBX/FS PBX server
   itself.

.. note::

   The ``America/Toronto`` timezone used in the examples below is for
   reference only. Replace it with the TZ identifier that matches your
   WHMCS/PBX environment.

What the Health Check Verifies
==============================

.. list-table:: Health Check PHP Requirements
   :header-rows: 1
   :widths: 25 20 55
   :align: left

   * - Check
     - Minimum to Pass
     - Recommended for Production
   * - PHP Version
     - 7.4+
     - PHP 8.1 / 8.2 (match your WHMCS version and ionCube encoder
       availability)
   * - ``memory_limit``
     - 128M
     - 2048M minimum; 8192M for large tariff imports or high CDR
       volume
   * - ``max_execution_time``
     - 60
     - 4300 (long-running Autobill and tariff imports)
   * - ``max_input_time``
     - —
     - 8600
   * - ``max_input_vars``
     - —
     - 5000
   * - ``upload_max_filesize``
     - 8M
     - 100M (based on maximum tariff CSV size)
   * - ``post_max_size``
     - 8M
     - 100M (must be ≥ ``upload_max_filesize``)
   * - ``date.timezone``
     - Must be set
     - Set to your PBX/billing timezone, e.g. ``America/Toronto``
   * - ``session.gc_maxlifetime``
     - —
     - 3600
   * - ``zlib.output_compression``
     - —
     - Off (prevents truncated Health Check/CSV output)

Required PHP Extensions
=======================

The Health Check confirms the following extensions are loaded:

* ``pdo``
* ``pdo_mysql``
* ``curl``
* ``mbstring``
* ``json``
* ``openssl``
* ``xml``

On cPanel/EA4 these are typically provided by packages such as
``ea-php82-php-curl``, ``ea-php82-php-mbstring``,
``ea-php82-php-mysqlnd``, and ``ea-php82-php-xml``. Enable them via
**WHM → EasyApache 4** or **MultiPHP INI Editor / MultiPHP Manager**
for the PHP version assigned to the WHMCS account.

Apache (``.htaccess`` / mod_php)
=================================

When PHP runs as an Apache module (``mod_php``), settings can be placed
in the WHMCS root ``.htaccess`` file. Adjust the ``IfModule`` name to
the PHP version in use (for example, ``php82_module``):

.. code-block:: apache

   <IfModule php82_module>
       php_flag display_errors On
       php_value max_execution_time 4300
       php_value max_input_time 8600
       php_value max_input_vars 5000
       php_value memory_limit 8192M
       php_value session.gc_maxlifetime 3600
       php_value session.save_path "/tmp"
       php_value upload_max_filesize 100M
       php_value post_max_size 100M
       php_value date.timezone "America/Toronto"
       php_flag zlib.output_compression Off
   </IfModule>

.. warning::

   ``display_errors On`` should be enabled only for troubleshooting. Set
   it to ``Off`` in production once the Health Check passes.

PHP-FPM / CGI (no mod_php)
==========================

``php_flag`` / ``php_value`` directives are only valid with
``mod_php``. On hosts running **PHP-FPM** or **CGI** (common on cPanel
with ``ea-php``), use one of these instead:

Place a ``.user.ini`` file in the WHMCS root directory:

.. code-block:: ini

   memory_limit = 8192M
   max_execution_time = 4300
   max_input_time = 8600
   max_input_vars = 5000
   upload_max_filesize = 100M
   post_max_size = 100M
   date.timezone = "America/Toronto"
   session.gc_maxlifetime = 3600
   zlib.output_compression = Off

Or set the same values per-domain via **cPanel → MultiPHP INI Editor**
(or ``php.ini`` where permitted).

Virtualmin
==========

For Virtualmin hosts, PHP settings are typically managed through the
virtual server's PHP configuration rather than ``.htaccess``.

* Edit ``php.ini`` for the virtual server, for example:

  * ``/home/USERNAME/etc/php.ini`` (older Virtualmin)
  * ``/home/USERNAME/etc/php8.2/php.ini`` (per-version PHP-FPM)
  * ``/home/USERNAME/etc/php8.3/php.ini``

* Add or update the following values in the active ``php.ini``:

.. code-block:: ini

   memory_limit = 8192M
   max_execution_time = 4300
   max_input_time = 8600
   max_input_vars = 5000
   upload_max_filesize = 100M
   post_max_size = 100M
   date.timezone = "America/Toronto"
   session.gc_maxlifetime = 3600
   zlib.output_compression = Off

* Restart the PHP-FPM pool for the virtual server after saving. In
  Virtualmin, go to **Server Configuration → PHP Options** to confirm
  which PHP version and configuration file are active for the domain.

ionCube Loader Path
~~~~~~~~~~~~~~~~~~~

The ionCube Loader is a separate binary that is not located in PHP's
normal ``extension_dir``. It is usually installed under
``/usr/local/ioncube/`` or, in Virtualmin, copied into the virtual
server's config directory.

* Find the available ionCube Loader files on the WHMCS host:

  .. code-block:: bash

     find / -name 'ioncube_loader_lin_*.so' 2>/dev/null

* On a cPanel/Virtualmin host the output will show multiple loaders,
  for example:

  .. code-block:: text

     /usr/local/ioncube/ioncube_loader_lin_8.2.so
     /usr/local/ioncube/ioncube_loader_lin_8.3.so
     /usr/local/ioncube/ioncube_loader_lin_8.4.so
     /home/USERNAME/etc/ioncube_loader_lin_8.2.so

* Find the active PHP configuration files:

  .. code-block:: bash

     php -i | grep "Loaded Configuration File"
     php -i | grep "Additional .ini files parsed"

* The ionCube Loader is often loaded through an additional ``.ini``
  file in a ``conf.d`` directory rather than the main ``php.ini``.
  A common PHP-FPM example is:

  .. code-block:: text

     /etc/php/8.2/fpm/conf.d/00-ioncube.ini

  The active CLI example may also show:

  .. code-block:: text

     Additional .ini files parsed => /etc/php/8.4/cli/conf.d/00-ioncube.ini,

* The ionCube ``.ini`` file contains a single ``zend_extension`` line:

  .. code-block:: ini

     zend_extension = /usr/local/ioncube/ioncube_loader_lin_8.2.so

* For a Virtualmin virtual server, the per-domain path is commonly:

  .. code-block:: ini

     zend_extension = /home/USERNAME/etc/ioncube_loader_lin_8.2.so

* Replace ``USERNAME`` with the WHMCS system user, ``8.2`` with the
  active PHP version, and use the actual ``.ini`` file shown by
  ``php -i``.

LiteSpeed (lsapi)
=================

LiteSpeed honours ``php_value``/``php_flag`` in ``.htaccess`` through
the ``lsapi_module``:

.. code-block:: apache

   <IfModule lsapi_module>
       php_flag display_errors On
       php_value max_execution_time 4300
       php_value max_input_time 8600
       php_value max_input_vars 5000
       php_value memory_limit 8192M
       php_value session.gc_maxlifetime 3600
       php_value session.save_path "/tmp"
       php_value upload_max_filesize 100M
       php_value post_max_size 100M
       php_value date.timezone "America/Toronto"
       php_flag zlib.output_compression Off
   </IfModule>

LiteSpeed Timeout Overrides
===========================

If you encounter a **500 Server Error / timeout** during large tariff
imports or Autobill runs on a large number of CDR records, add
LiteSpeed's no-abort overrides to ``.htaccess``:

.. code-block:: apache

   RewriteRule .* - [E=noabort:1]
   RewriteRule .* - [E=noconntimeout:1]

Timezone Fallback (configuration.php)
=====================================

If your hosting provider does not allow overriding ``date.timezone``
through ``php.ini``, ``.user.ini``, or ``.htaccess``, set the default
timezone directly in the WHMCS ``configuration.php`` file so CRON runs
use the correct timezone:

.. code-block:: php

   date_default_timezone_set('America/Toronto');

Edit the value to the timezone of your PBX server (TZ identifier
format, for example ``America/New_York``, ``Europe/London``).

Verifying with the Health Check
===============================

1. Log in to the WHMCS admin area.
2. Run the Health Check from the ictVoIP Billing addon dashboard, or
   browse directly to:

   ``https://yourwhmcs.com/modules/addons/ictvoipbilling/healthcheck.php``

3. Confirm the **PHP Environment** section reports pass (green) for:

   * PHP Version (7.4+)
   * PHP Extensions (all required extensions loaded)
   * PHP Settings (memory, execution time, upload sizes, timezone)

4. Re-run the check after each PHP or web server change. If
   ``.htaccess`` or ``.user.ini`` edits are not taking effect, confirm
   which PHP handler (``mod_php``, PHP-FPM, or LiteSpeed lsapi) is
   assigned to the account.
