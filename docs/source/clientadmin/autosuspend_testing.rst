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
4. **Unsuspension:** When credit is restored, script sets ``suspend = 'no'`` and reverses the configured suspension method (re-enables the gateway or extensions per the product's **Auto Suspend Mode**)

Scope, Triggers, and Exemptions
********************************

AutoSuspend evaluates **every active client holding at least one FusionPBX product**. The decision is based solely on the client's WHMCS credit balance versus outstanding FusionPBX invoices - it does **not** consult the package's Real-Time Billing flag, Free Minutes allowance, or tariff configuration.

.. list-table::
   :widths: 45 55
   :header-rows: 1

   * - Condition
     - Result
   * - Client credit ≤ $0
     - All FusionPBX services on the account are suspended
   * - Outstanding FusionPBX invoices > credit
     - All FusionPBX services on the account are suspended
   * - Credit restored / invoices paid
     - Next cron run unsuspends automatically

Suspension applies to the **VoIP service only** - the client account and non-VoIP services are never affected.

Suspension Method
==================

The suspension method is configured per product via the module setting **Auto Suspend Mode**:

- **Gateway** - disables the tenant's SIP trunk gateway in FusionPBX (blocks all calls)
- **Extension** - disables individual extensions assigned to the service (gateway stays active)

Manual suspension should be performed on the service itself (Client Profile → Products/Services → Suspend) so the configured suspension method is invoked. Client-level toggles do not run the module's suspend/unsuspend routines.

Exempting a Client
==================

To exempt a client from AutoSuspend entirely - for example, a fixed-fee metered subscription that must never be credit-suspended - set the client custom field **FusionPBX Suspended** to ``Never Suspend``. The cron skips that client completely.

.. note::
   The exemption is client-level and applies to all of the client's FusionPBX services. There is currently no per-product exemption.

Free Minutes and Real-Time Billing
====================================

Free Minutes is a billing/rating concept only - it has no effect on the AutoSuspend decision. Likewise, the Real-Time Billing flag on a package does not exempt it from AutoSuspend. Any client with a FusionPBX service and a zero or negative credit balance will be suspended on the next cron run unless the ``Never Suspend`` flag is set.

.. warning::
   Manually unsuspending a service does not change the credit condition that triggered the suspension. If credit remains ≤ $0, the next cron run suspends the service again - including re-triggering when the tracking table still shows ``suspend = 'yes'`` against an unsuspended service. The correct recovery is to add credit or pay the outstanding invoices; the script then unsuspends automatically.

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
4. **Check FusionPBX tenant** - gateway disabled (Gateway mode) or extensions disabled (Extension mode)
5. Confirm ``mod_fusionpbx_suspend_account`` shows ``suspend = 'yes'``

Test 2: Unsuspension
=====================

1. Add credit to client account (or pay invoice)
2. Run autosuspend script again
3. Verify output shows "Unsuspending service..."
4. **Check FusionPBX tenant** - gateway/extensions re-enabled per the product's Auto Suspend Mode
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
