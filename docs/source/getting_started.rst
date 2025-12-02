Getting Started
===============

Overview
--------

This guide will help you install and configure the ictVoIP Billing
application for **ictVoIP Billing v1.4.0** and later. Follow the steps
in the menu to the left for a streamlined setup experience. For PDF and
EPUB versions of this documentation, click the **v:latest** menu at the
bottom left.

Key Features
-----------

* **Quick Installation** - Streamlined setup process for rapid deployment
* **Security Configuration** - Comprehensive security setup and best practices
* **SSL/TLS Setup** - Automated certificate management with Let's Encrypt
* **Backup and Recovery** - Complete backup and restoration procedures
* **Multi-language Support** - Internationalization and localization features
* **Firewall Configuration** - Network security and access control setup
* **Provisioning & PBX Integration** - Orientation to the
  :doc:`applications/provision` overview and PBX module documentation
  for FusionPBX, Vodia, and other supported systems

Supported Versions
-----------------

* **WHMCS v8.13.x** (recommended)
* **Limited support for some older WHMCS versions**
* **PHP 8.1, 8.2, 8.3**
* **ionCube Loader v14**

Installation Process
-------------------

The ictVoIP Billing installation consists of several key steps:

* **System Preparation** - Server requirements and environment setup
* **Application Installation** - Core system deployment and
  configuration (see :doc:`getting_started/quick_install` for the
  primary checklist)
* **Security Hardening** - Security best practices and access control
* **SSL Certificate Setup** - Secure communications configuration
* **Backup Configuration** - Data protection and recovery planning

After you complete the installation and basic security steps, continue
with the **Admin Area** documentation (:doc:`/admin`) to configure
servers, providers, tariffs, and packages. For ongoing day-to-day
management of tenants, extensions, and gateways, use the **Client
Services Admin Area** (:doc:`/admin/client_services`).

.. toctree::
   :maxdepth: 3
   :caption: Installation Guide

   getting_started/training
   getting_started/quick_install
   getting_started/lets_encrypt
   applications/provision
   getting_started/security
   getting_started/backup
   getting_started/restore
   firewall
   getting_started/languages
