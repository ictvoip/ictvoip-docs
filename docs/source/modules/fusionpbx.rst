FusionPBX Integration
====================

Overview
--------

FusionPBX is a powerful open-source communications platform that provides a comprehensive web-based interface for managing FreeSWITCH. The ictVoIP Billing integration extends FusionPBX with custom APIs, themes, and WHMCS integration capabilities.

Key Features
-----------

* **Custom API Endpoints** - RESTful APIs for extension management, registration status, and CDR collection
* **ictVoIP Branding** - Custom login page and theme with company branding
* **WHMCS Integration** - Automated provisioning and billing through WHMCS
* **Gateway Management** - Programmatic gateway provisioning and monitoring
* **CDR Collection** - Automated call detail record collection for billing
* **Multi-tenant Support** - Support for multiple domains and tenants

Supported Versions
-----------------

* **FusionPBX v5.3.x** (Recommended)
* **FusionPBX v5.1.x** (Legacy support)
* **FreeSWITCH v1.10+**
* **PostgreSQL v12+**

Architecture
-----------

The ictVoIP FusionPBX integration consists of several components:

* **API Layer** - Custom PHP endpoints for external integration
* **Theme Layer** - Custom branding and user interface modifications
* **Database Layer** - Extended schema for billing and provisioning
* **WHMCS Module** - Client portal integration and automation

.. toctree::
   :maxdepth: 2

   fusionpbx/installation
   fusionpbx/configuration
   fusionpbx/api_endpoints
   fusionpbx/troubleshooting 