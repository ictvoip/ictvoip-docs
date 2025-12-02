Restore Strategy Overview
=========================

Overview
--------

This guide provides a high-level overview of how to approach restoring
an ictVoIP Billing deployment, including WHMCS and PBX components.
Exact restore commands and environment-specific steps depend on your
hosting platform and are outside the scope of this document.

General Restore Principles
--------------------------

* Always restore to a **staging or test environment** first when
  possible.
* Keep clear notes about which backup is being restored (date, scope,
  versions).
* Coordinate restores with your change management and incident
  response processes.

Typical Restore Scenarios
-------------------------

1. **WHMCS-Only Restore**

   Used when:

   * A WHMCS upgrade or addon change caused issues.
   * Configuration or data within WHMCS was corrupted.

   High-level steps:

   * Restore the WHMCS database from a recent dump.
   * Restore the WHMCS application files (including ictVoIP Billing
     addon) from backup.
   * Verify:
     - Admin login works.
     - Client data and invoices appear correctly.
     - ictVoIP Billing addon pages load without errors.

2. **PBX-Only Restore**

   Used when:

   * A PBX configuration change or upgrade caused service issues.
   * Dialplans, domains, or extensions were accidentally deleted.

   High-level steps:

   * Restore the PBX database from backup.
   * Restore PBX configuration files and custom API endpoints.
   * Restart PBX services and web server.
   * Verify:
     - Core PBX services (registration, calls) work.
     - Domains, extensions, and gateways are present.

3. **Coordinated WHMCS + PBX Restore**

   Used when:

   * A major incident affects both WHMCS and PBX data consistency.
   * A full environment rollback is required (for example, to
     pre-upgrade state).

   High-level steps:

   * Restore PBX database and configuration to a consistent snapshot.
   * Restore WHMCS database and files to the same point-in-time.
   * Confirm that:
     - Tenant domains and extensions in PBX match what ictVoIP Billing
       expects.
     - Billing data and provisioning states in WHMCS align with PBX
       state.

Validation After Restore
------------------------

After any restore, perform basic validation:

* WHMCS
  - Admin login and basic navigation.
  - ictVoIP Billing addon dashboard and health check.

* PBX
  - Registration of test endpoints.
  - Test calls (inbound and outbound) for one or more tenants.

* Billing & CDRs
  - Check that CDR imports and autobill processes run without errors.
  - Spot-check one or two accounts for expected usage and charges.

Documentation & Follow-Up
-------------------------

* Record what was restored, from which backup, and why.
* Note any manual adjustments required after the restore.
* Review backup frequency and scope if gaps were discovered during the
  restore process.

For environment-specific commands and procedures, refer to your
hosting provider's documentation and internal runbooks.
