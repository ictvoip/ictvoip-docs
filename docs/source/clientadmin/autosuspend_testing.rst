.. _autosuspend_testing:

AutoSuspend Testing Guide
###########################

.. important::
   This guide covers proper testing procedures for the AutoSuspend script. Following the correct sequence prevents "stuck" suspension states.

Overview
*********

The FusionPBX AutoSuspend script automatically suspends/unsuspends client services based on their credit balance. It tracks suspension state in the ``mod_fusionpbx_suspend_account`` database table to prevent duplicate operations.

.. warning::
   The script uses state tracking to determine if a service is already suspended. Testing must follow the proper sequence to keep the database state synchronized with the actual gateway status.

How It Works
*************

1. **Suspension Trigger:** When client credit ≤ $0 or outstanding invoices exceed credit
2. **State Tracking:** Script records ``suspend = 'yes'`` in ``mod_fusionpbx_suspend_account``
3. **Skip Logic:** If already marked as suspended, script skips (prevents duplicate API calls)
4. **Unsuspension:** When credit is restored, script sets ``suspend = 'no'`` and re-enables gateway

Critical Testing Rules
***********************

.. list-table:: DO vs DON'T
   :widths: 50 50
   :header-rows: 1

   * - ✅ DO
     - ❌ DON'T
   * - Always complete the full suspend → unsuspend cycle
     - Manually enable gateway in FusionPBX UI during testing
   * - Use the autosuspend script for all state changes
     - Directly modify ``mod_fusionpbx_suspend_account`` table during testing
   * - Run in browser debug mode first to verify logic
     - Skip the unsuspend step before testing suspend again
   * - Check debug output for "Already suspended - skipping"
     - Assume the script failed without checking state table
   * - **Verify gateway status directly in FusionPBX tenant**
     - **Use ictVoIPBilling Client Services / Gateways to verify**

Where to Verify Gateway Status
*******************************

.. tip::
   **CORRECT:** Check the gateway status directly in the **FusionPBX tenant UI**:
   
   - Login to FusionPBX → Gateways → Check if gateway is Enabled/Disabled
   - Check Sofia Status to confirm gateway is running/stopped

.. danger::
   **INCORRECT:** Do NOT use **ictVoIPBilling → Client Services → Gateways** to verify:
   
   - This view is **not live** - it shows cached/synced data
   - Must be manually resynced to reflect current FusionPBX state
   - Will show stale data if gateway was changed by autosuspend

Proper Testing Sequence
************************

Test 1: Suspension
===================

1. Set client credit to $0 or create unpaid invoice exceeding credit
2. Run autosuspend script in browser (debug mode)
3. Verify output shows "Suspending service..."
4. **Check FusionPBX tenant** - gateway should be disabled
5. Confirm ``mod_fusionpbx_suspend_account`` shows ``suspend = 'yes'``

Test 2: Unsuspension
=====================

1. Add credit to client account (or pay invoice)
2. Run autosuspend script again
3. Verify output shows "Unsuspending service..."
4. **Check FusionPBX tenant** - gateway should be enabled
5. Confirm ``mod_fusionpbx_suspend_account`` shows ``suspend = 'no'``

Test 3: Re-Suspension
======================

1. Remove credit again
2. Run autosuspend script
3. Should now suspend properly (state was reset in Test 2)

Troubleshooting Stuck States
*****************************

If testing was done out of sequence and the script shows "Already suspended - skipping" but the gateway is actually enabled:

**Option 1: Complete the Cycle**

Add credit and run unsuspend first, then remove credit and suspend again.

**Option 2: Reset Database State (Admin Only)**

.. code-block:: sql

   -- Check current state
   SELECT * FROM mod_fusionpbx_suspend_account WHERE service_id = [SERVICE_ID];
   
   -- Reset to allow fresh suspension
   UPDATE mod_fusionpbx_suspend_account 
   SET suspend = 'no', updated_at = NOW() 
   WHERE service_id = [SERVICE_ID];

.. warning::
   After resetting the database, you must run the autosuspend script to re-sync the actual gateway state.

CRON Setup
***********

For production use, set up the CRON job with the ``?runfrom=cron`` parameter:

.. code-block:: bash

   # Run every 5 minutes (recommended)
   */5 * * * * TZ=America/Toronto curl -s "https://yourwhmcs.com/modules/servers/fusionpbx/autosuspend.php?runfrom=cron" >/dev/null 2>&1

.. note::
   The ``?runfrom=cron`` parameter suppresses HTML output and runs silently.

Debug vs CRON Mode
*******************

.. list-table::
   :widths: 20 40 40
   :header-rows: 1

   * - Mode
     - URL
     - Output
   * - Debug (Browser)
     - ``autosuspend.php``
     - Full HTML with status messages
   * - CRON
     - ``autosuspend.php?runfrom=cron``
     - Silent (no output)

Database Table
***************

The ``mod_fusionpbx_suspend_account`` table tracks suspension state:

.. list-table::
   :widths: 25 25 50
   :header-rows: 1

   * - Column
     - Type
     - Description
   * - id
     - int
     - Primary key
   * - service_id
     - int
     - WHMCS hosting service ID
   * - client_id
     - int
     - WHMCS client ID
   * - suspend
     - varchar
     - Current state: 'yes' or 'no'
   * - created_at
     - timestamp
     - First suspension time
   * - updated_at
     - timestamp
     - Last state change

|

----

**Script Version:** 1.1.0

**Author:** ictVoIP Canada
