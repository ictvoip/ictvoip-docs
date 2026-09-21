*********************************
ictVoIP Billing Management
*********************************

Overview
--------

The Administration section groups the core ictVoIP Billing management
features for WHMCS admins. From here you can configure providers,
tariffs, packages, PBX servers, and use the dedicated **Client
Services** admin dashboard for day-to-day FusionPBX operations.

Key Features
------------

* **Client Services Admin Area** – Centralized dashboard for managing
  FusionPBX tenants, extensions, gateways, ACLs, destination routes,
  logs, and real-time provisioning statistics. See
  :doc:`/admin/client_services`.
* **Provider Management** – Define PBX/VoIP providers and link them to
  tariffs and packages for automated billing. See
  :doc:`/admin/providers`.
* **Tariff Management** – Configure rate tables and markup strategies
  used for call rating. See :doc:`/admin/tariffs`.
* **Package Management** – Build VoIP packages that combine tariffs,
  limits, and options for WHMCS products. See :doc:`/admin/packages`.
* **Server Management** – Register and test PBX servers, including
  FusionPBX hosts, and configure API connectivity. See
  :doc:`/admin/servers`.
* **CDR & E.164 Tools** – Validate and normalize CDR data for accurate
  billing. See :doc:`/admin/cdr-e164-validator`.

Details for each area are provided in the sections below.

Version Notification Banner
---------------------------

Starting with ictVoIP Billing v1.4.1, a version-check banner appears at the top of the addon admin pages. Each time an admin page loads, the addon queries the licensing endpoint and compares the installed version with the latest available release.

The banner can show three states:

* **Green (success)** — the installed version matches the latest released version.
* **Yellow (warning)** — a newer version is available. The banner displays the installed and latest versions and includes links to download the update and view the changelog.
* **Blue (info)** — the installed version is newer than the version reported by the licensing endpoint.

The result of the version check is cached in the ``tbladdonmodules`` table (``update_available``, ``current_version_info``, and ``last_version_check`` settings) and is updated on each page load.

To hide the banner, keep the addon up to date with the latest release.

.. seealso::

   Upgrade procedures for the ictVoIP Billing addon and FusionPBX module are
   documented in :doc:`/upgrades`.

.. toctree::
   :maxdepth: 3

   client_services
   providers
   tariffs
   packages
   servers
   cdr-e164-validator
  
