.. image:: _static/images/document_logo.png
        :scale: 100%
        :align: center
        :alt: ictVoIP Canada

ictVoIP Billing Administrators Guide for WHMCS
==============================================

**ictVoIP Billing Management System**
------------------------------------

ictVoIP Billing Management System is a comprehensive WHMCS addon application that supports multiple providers and various PBX systems. It calculates call times and allows for tariff-based or custom rate billing. The system provides automation for billing overage minutes based on metered plans or VoIP product plans, with CDR views for customer reports based on billing cycles. Client Area addons for customers are continuously expanding within our development roadmap.

.. note::

   This project is under active development.
   Supported WHMCS versions include 8.12+.
   Supported PHP versions include 8.1

🎬 Watch the Introduction Video
------------------------------

.. image:: _static/images/home/video_intro2.png
   :scale: 65%
   :align: center
   :alt: Click to watch the ictVoIP Billing Introduction Video
   :target: https://blackwolf.riverdog.ca/s/Z2tZTzLRbKfTgo6

.. raw:: html

   <script>
   document.addEventListener('DOMContentLoaded', function() {
       var videoImage = document.querySelector('img[alt="Click to watch the ictVoIP Billing Introduction Video"]');
       if (videoImage) {
           videoImage.style.cursor = 'pointer';
           videoImage.addEventListener('click', function(e) {
               e.preventDefault();
               e.stopPropagation();
               window.open('https://blackwolf.riverdog.ca/s/Z2tZTzLRbKfTgo6', '_blank');
               return false;
           });
       }
   });
   </script>

.. image:: _static/images/qr_video_intro3.png
   :scale: 50%
   :align: center
   :alt: QR Code for ictVoIP Billing Introduction Video

.. note::

   **📱 Mobile Access**: Scan the QR code above to watch the video on your mobile device.
   
   **🔗 Direct Link**: `Watch the video directly here <https://blackwolf.riverdog.ca/s/Z2tZTzLRbKfTgo6>`_ (opens in new tab)

.. raw:: html

   <script>
   document.addEventListener('DOMContentLoaded', function() {
       // Make direct link open in new tab
       var links = document.querySelectorAll('a[href="https://blackwolf.riverdog.ca/s/Z2tZTzLRbKfTgo6"]');
       links.forEach(function(link) {
           link.setAttribute('target', '_blank');
           link.setAttribute('rel', 'noopener noreferrer');
       });
   });
   </script>

✨ Key Features
**************

The International FusionPBX Billing system, integrated with WHMCS & ictVoIP Billing System, offers a robust set of features for managing VoIP services:

* **🏢 Single or Multi PBX Support** - Flexible infrastructure setups
* **🏢 Multi-Tenant or Single-Tenant** - Diverse customer structures
* **💱 Multi-Currency Support** - Operate in different currencies
* **💳 Postpaid or Prepaid Invoicing** - Flexible billing models
* **🌍 National and International Call Billing** - Comprehensive call handling
* **📊 Tariff Billing Management** - Comprehensive rate management
* **💰 Markup based on Tariffs and Custom Rates** - Flexible pricing strategies
* **📞 Automatic CDR Collection** - Streamlined call data gathering
* **👤 Client Portal Access** - End-user account management
* **📈 Metered or Pay As You Go** - Precise usage-based billing
* **🔔 Payment Reminders** - Automated payment notifications

🔧 Compatibility
***************

ictVoIP Billing is compatible with:

* **WHMCS**: 8.12+
* **PHP**: 8.1
* **Web Servers**: Apache, LiteSpeed, Nginx
* **Databases**: MySQL 5.7+, MariaDB 10.3+

You may contact us for a limited Trial for your FusionPBX and WHMCS. Please be sure to indicate your current setup and confirguration based on our requirements which must be met first. Indicate if you require installation assistance for your Test Environment:
`ictVoIP Billing for FusionPBX Software Contact <https://www.icttech.ca/contact.php>`_

🚀 Installation & Setup
=======================

.. toctree::
   :maxdepth: 3
   :caption: Installation Guide

   getting_started.rst

⚙️ System Administration
========================

.. toctree::
   :maxdepth: 3
   :caption: Administration Guide

   admin.rst

🔌 Server Modules
=================

.. toctree::
   :maxdepth: 3
   :caption: Supported PBX Systems

   modules/fusionpbx
   modules/vodia
   modules/lesnet
   modules/providers
   modules/custom_integration

👥 Client Management
====================

.. toctree::
   :maxdepth: 3
   :caption: Client Features

   clientadmin.rst
   clientarea.rst
   extra_addons.rst

🔌 API Reference
================

ictVoIP Billing provides comprehensive API access for integration, automation, and management across all supported modules. See the sections below for quick access to API documentation for each module and general API usage.

.. toctree::
   :maxdepth: 3
   :caption: API Documentation

   api/overview
   modules/fusionpbx/api_endpoints
   modules/vodia
   modules/providers
   api/whmcs_integration
   api/pbx_apis
   api/billing_apis
   api/webhooks

📋 How-To Guides
================

The following guides provide step-by-step instructions for installing, configuring, and maintaining the complete ictVoIP Billing system:

- **Quick Install:** Fast setup for ictVoIP Billing on WHMCS, including module upload, activation, and licensing.
- **CDR Maintenance:** How to manage and maintain Call Detail Records (CDRs) for accurate billing and reporting.
- **Additional Information:** Special notes, tips, and troubleshooting for advanced scenarios.

.. toctree::
   :maxdepth: 3
   :caption: Practical Guides

   getting_started/quick_install
   cdr_main/cdr_maint
   additional_information/additional_information

📚 Reference
============

+-------------------------+-----------------------------------------------+
| Technology              | Official Site                                 |
+=========================+===============================================+
| WHMCS                   | https://www.whmcs.com/                        |
+-------------------------+-----------------------------------------------+
| PHP                     | https://www.php.net/                          |
+-------------------------+-----------------------------------------------+
| PostgreSQL              | https://www.postgresql.org/                   |
+-------------------------+-----------------------------------------------+
| MySQL                   | https://www.mysql.com/                        |
+-------------------------+-----------------------------------------------+
| MariaDB                 | https://mariadb.org/                          |
+-------------------------+-----------------------------------------------+
| phpMyAdmin              | https://www.phpmyadmin.net/                   |
+-------------------------+-----------------------------------------------+
| FusionPBX               | https://www.fusionpbx.com/                    |
+-------------------------+-----------------------------------------------+
| Vodia PBX               | https://vodia.com/                            |
+-------------------------+-----------------------------------------------+
| FreeSWITCH              | https://freeswitch.com/                       |
+-------------------------+-----------------------------------------------+
| LiteSpeed               | https://www.litespeedtech.com/                |
+-------------------------+-----------------------------------------------+
| Apache HTTP Server      | https://httpd.apache.org/                     |
+-------------------------+-----------------------------------------------+
| Nginx                   | https://nginx.org/                            |
+-------------------------+-----------------------------------------------+
| cPanel                  | https://cpanel.net/                           |
+-------------------------+-----------------------------------------------+
| Debian                  | https://www.debian.org/                       |
+-------------------------+-----------------------------------------------+
| Ubuntu                  | https://ubuntu.com/                           |
+-------------------------+-----------------------------------------------+
| SSL/TLS (Let's Encrypt) | https://letsencrypt.org/                      |
+-------------------------+-----------------------------------------------+
| CRON                    | https://en.wikipedia.org/wiki/Cron            |
+-------------------------+-----------------------------------------------+

.. toctree::
   :maxdepth: 1
   :caption: Core Technologies

   reference/whmcs
   reference/php
   reference/postgresql
   reference/mysql
   reference/mariadb
   reference/phpmyadmin
   reference/fusionpbx
   reference/vodia
   reference/freeswitch
   reference/litespeed
   reference/apache
   reference/nginx
   reference/cpanel
   reference/debian
   reference/ubuntu
   reference/ssl_tls
   reference/cron

📞 Support
==========

Below are support and community resources for the core technologies used in the ictVoIP Billing system:

+-------------------------+--------------------------------------------------------------+
| Technology              | Support / Community Links                                    |
+=========================+==============================================================+
| ictVoIP Canada          | https://www.icttech.ca/index.php?rp=/knowledgebase           |
+-------------------------+--------------------------------------------------------------+
| WHMCS Help              | https://help.whmcs.com/                                      |
+-------------------------+--------------------------------------------------------------+
| WHMCS Forums            | https://forums.whmcs.com/                                    |
+-------------------------+--------------------------------------------------------------+
| PHP                     | https://www.php.net/support.php                              |
+-------------------------+--------------------------------------------------------------+
| PHP Repo                | https://github.com/php/php-src                               |
+-------------------------+--------------------------------------------------------------+
| PostgreSQL Community    | https://www.postgresql.org/community/                        |
+-------------------------+--------------------------------------------------------------+
| PostgreSQL General      | https://www.postgresql.org/list/pgsql-general/               |
+-------------------------+--------------------------------------------------------------+
| MySQL Forums            | https://forums.mysql.com/                                    |
+-------------------------+--------------------------------------------------------------+
| MySQL Repo              | https://github.com/mysql/mysql-server                        |
+-------------------------+--------------------------------------------------------------+
| MariaDB Community       | https://mariadb.org/community/                               |
+-------------------------+--------------------------------------------------------------+
| MariaDB Knowledgebase   | https://mariadb.com/kb/en/mariadb-community/                 |
+-------------------------+--------------------------------------------------------------+
| phpMyAdmin              | https://github.com/phpmyadmin/phpmyadmin                     |
+-------------------------+--------------------------------------------------------------+
| phpMyAdmin Questions    | https://stackoverflow.com/questions/tagged/phpmyadmin        |
+-------------------------+--------------------------------------------------------------+
| FusionPBX Forums        | https://www.pbxforums.com/                                   |
+-------------------------+--------------------------------------------------------------+
| FusionPBX Repo          | https://github.com/fusionpbx/fusionpbx                       |
+-------------------------+--------------------------------------------------------------+
| Vodia PBX               | https://forum.vodia.com/                                     |
+-------------------------+--------------------------------------------------------------+
| FreeSWITCH              | https://freeswitch.org/confluence/display/FREESWITCH/Support |
+-------------------------+--------------------------------------------------------------+
|                         | https://github.com/signalwire/freeswitch                     |
+-------------------------+--------------------------------------------------------------+
| LiteSpeed               | https://forum.litespeedtech.com/                             |
+-------------------------+--------------------------------------------------------------+
|                         | https://github.com/litespeedtech                             |
+-------------------------+--------------------------------------------------------------+
| Apache HTTP Server      | https://httpd.apache.org/lists.html                          |
+-------------------------+--------------------------------------------------------------+
|                         | https://github.com/apache/httpd                              |
+-------------------------+--------------------------------------------------------------+
| Nginx                   | https://forum.nginx.org/                                     |
+-------------------------+--------------------------------------------------------------+
|                         | https://github.com/nginx/nginx                               |
+-------------------------+--------------------------------------------------------------+
| cPanel                  | https://forums.cpanel.net/                                   |
+-------------------------+--------------------------------------------------------------+
|                         | https://github.com/CpanelInc                                 |
+-------------------------+--------------------------------------------------------------+
| Debian                  | https://forums.debian.net/                                   |
+-------------------------+--------------------------------------------------------------+
|                         | https://salsa.debian.org/                                    |
+-------------------------+--------------------------------------------------------------+
| Ubuntu                  | https://ubuntuforums.org/                                    |
+-------------------------+--------------------------------------------------------------+
|                         | https://github.com/canonical                                 |
+-------------------------+--------------------------------------------------------------+
| SSL/TLS (Let's Encrypt) | https://community.letsencrypt.org/                           |
+-------------------------+--------------------------------------------------------------+
|                         | https://github.com/letsencrypt/letsencrypt                   |
+-------------------------+--------------------------------------------------------------+
| CRON                    | https://unix.stackexchange.com/questions/tagged/cron         |
+-------------------------+--------------------------------------------------------------+


.. toctree::
   :maxdepth: 2
   :caption: Support Resources

   support/faq
   support/contact
   contributing.rst 
