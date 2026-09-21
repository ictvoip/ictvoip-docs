Troubleshooting
===============

.. contents::
   :local:
   :depth: 2

Common Issues
-------------

DIDWW Identity Submission Fails
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Symptoms:**

* API returns 400 Bad Request error during identity submission
* Error message displayed in provisioning queue

**Solution:**

* Contact **ictVoIP Canada support** with the following information:

  * Order ID
  * Client name
  * Error message displayed
  * Screenshot of error (if available)

* Support will investigate and resolve the issue

DIDWW Order Stuck in Awaiting Registration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Symptoms:**

* Order status doesn't change after several days
* No error messages

**Solution:**

* Wait 1-3 business days for DIDWW manual review
* Check DIDWW portal for verification status
* Contact DIDWW support if > 5 business days

DIDWW Order Shows Blocked or Terminated
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Symptoms:**

* Order status changes to blocked or terminated
* Cannot proceed with provisioning

**Solution:**

* Check DIDWW portal for rejection reason
* Contact DIDWW support with order details
* May need to re-submit with corrected information
* Use "Reset Purchase" button to restart from document upload phase

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

