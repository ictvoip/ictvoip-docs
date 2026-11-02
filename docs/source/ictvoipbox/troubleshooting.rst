Troubleshooting
===============

.. contents::
   :local:
   :depth: 2

Common Issues
-------------

Gateway UUID Not Syncing
^^^^^^^^^^^^^^^^^^^^^^^^^

**Symptoms:**

* Gateway created successfully but UUID is NULL
* DataTables shows "NO" in FPBX column

**Solution:**

* Gateway needs time to fully provision on FusionPBX
* Perform manual sync from ictVoIP Billing → Gateways tab
* Select tenant/server and click "Sync from FusionPBX"
* UUID will be fetched and stored

.. note::
   This is a known limitation during checkout provisioning. Manual sync required post-provisioning.

