Billing Models & Product Design
=================================

**Choosing the right billing configuration for each product**

ictVoIP Billing is built as a combination of independent engines — **rate sources**, **billing timing**, and **account controls**. Every product you sell is one coherent combination of these elements. The system is intentionally versatile: it can support nearly any ITSP business model, but it requires the administrator to select the correct combination for the product being designed.

.. important::

   The same package field can behave differently depending on which billing
   engine processes the call. Before configuring a product, decide **which
   business model it implements**, then configure every option consistently
   with that model. Mixing options from different models produces
   configurations that run without errors but bill in ways you did not
   intend.

The VoIP Credit Foundation
---------------------------

The platform is designed around a single principle that applies to **every**
billing model — real-time, metered, special-rate, or any combination:

**The customer must hold VoIP credit funds in their account before calls can be placed.**

- When the balance is depleted, the **Low Balance Threshold** alerts the client that funds are nearly exhausted.
- At zero, the product is **suspended** until the customer tops up their VoIP funds.
- This applies to all product types — metered bundles, real-time prepaid, and special-rate products alike.

How strictly this is enforced is yours to configure. For example, a larger
business client may be given a 7-day or 14-day allowance window to settle a
top-up before suspension — the ecosystem provides the controls to design that
policy; the decision itself is a business one.

|

Rate Sources (where the price comes from)
-----------------------------------------

A call's per-minute rate is resolved from one of three sources. These can be combined on a single product:

.. list-table::
   :header-rows: 1
   :class: fit-table
   :widths: 25 45 30

   * - Rate Source
     - Description
     - Typical Use
   * - **Provider Tariff**
     - Rate card matched by longest enabled dial prefix, optional markup
     - International/national calling from a carrier rate deck
   * - **Package Custom Rates**
     - Fixed per-minute package rates (inbound/outbound) with billing increments
     - Flat-rate local calling, bundled overage
   * - **Special Rates**
     - Dedicated rate table with pattern/prefix rules, per product
     - Premium numbers, destinations bypassing tariff rating

Special Rates can be applied alongside tariff or custom rates on the same product — calls matching a special-rate rule are rated from that table, while all other calls follow the normal resolution order. See :doc:`/admin/packages` for rate resolution details.

Billing Timing (when money moves)
----------------------------------

The second decision is **when** usage becomes a charge. ictVoIP Billing provides two timing engines:

.. list-table::
   :header-rows: 1
   :class: fit-table
   :widths: 25 45 30

   * - Timing Engine
     - Behavior
     - Business Model
   * - **Real-Time Billing**
     - Each completed call is rated and deducted from client credit immediately
     - Prepaid / pay-as-you-go
   * - **Autobill**
     - Usage accumulates per billing period; rated calls are invoiced on the billing run
     - Postpaid invoicing, metered bundles

.. warning::

   **Do not enable Real-Time Billing on a metered (included-minutes) product.**
   Real-time billing is a prepaid engine: it deducts each call from client
   credit and treats free minutes as *per-call* free minutes (for example,
   "the first minute of each call is free"). A metered product requires the
   **Autobill** path, where free minutes act as the *per-billing-period
   allowance* — the meter that included minutes are drawn against and that
   resets each billing cycle.

   Enabling Real-Time Billing on a package intended as a metered bundle
   produces exactly the symptoms of a misconfigured product: the allowance
   appears to apply to every call, usage is not accumulated against the
   period, and charges do not reflect the bundle design.

The Free Minutes field — two different meanings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because both engines share the package configuration, the **Free Minutes** field has a different meaning on each path:

.. list-table::
   :header-rows: 1
   :class: fit-table
   :widths: 30 70

   * - Path
     - Free Minutes meaning
   * - Real-Time Billing enabled
     - **Per-call** — each call is free for its first N minutes
   * - Real-Time Billing disabled (Autobill)
     - **Per-period** allowance — the meter for included minutes; overage invoiced at package rates

Account Controls (WHMCS + module controls working together)
------------------------------------------------------------

Policy enforcement comes from **two layers that work together** — WHMCS provides the billing foundation, and ictVoIP Billing adds VoIP-specific controls on top of it. The administrator chooses which controls from each layer best fit the product and business model being designed.

**From WHMCS (the foundation):**

- **Client credit** — the VoIP funds balance; top-ups, deductions, and history are managed by WHMCS
- **Automation settings** — invoice generation timing, prorata, and suspension scheduling
- **Service lifecycle** — product suspension/unsuspension, overdue handling, and invoice terms (for example, extended top-up windows for clients who warrant 7-day or 14-day terms)

**From ictVoIP Billing (the VoIP layer):**

- **AutoSuspend** — VoIP-aware suspension when the client's credit balance is exhausted
- **Low Balance Threshold** — alerts the client as their balance approaches zero, giving them time to top up before suspension
- **Per-package billing options** — real-time billing toggle, free minutes, custom rates, markups, increments, and Special Rates rules

.. note::

   These controls are intentionally policy-free — the platform enforces what
   you configure and does not assume your business rules. WHMCS settings do
   not automatically align with every billing model; the administrator must
   determine which controls from each layer best suit the product being
   designed. Deposit requirements, alert thresholds, grace windows, and
   suspension timing are decisions for your business, not the platform.

Worked Configurations
----------------------

The following recipes show coherent combinations for common product types. They are a **partial list** — the engines and controls combine to support a wide variety of billing options beyond these examples. Every recipe assumes the VoIP credit foundation described above: funds on account before calls, low-balance alerting, and suspension on depletion unless you configure otherwise.

Prepaid Pay-As-You-Go
~~~~~~~~~~~~~~~~~~~~~

*Customer tops up credit; each call deducts immediately; service suspends at zero.*

- Real-Time Billing: **enabled**
- Free Minutes: 0 (or a per-call promo amount)
- Custom rates or provider tariff for rate resolution
- Client credit: required deposit before calls can be made
- AutoSuspend: enabled; Low Balance Threshold: recommended

Metered Bundle (e.g., "200 included minutes")
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

*Fixed monthly fee plus included minutes; usage beyond the meter is billed as overage.*

The metered product is controlled by two elements working together: the
**meter** (the Free Minutes allowance, e.g. 200 included minutes) and the
**package rates** (tariff or custom rates, with the package's billing
increments). The WHMCS product invoice covers the fixed recurring fee.
Autobill then rates the period's usage: calls within the meter are included,
and usage beyond the meter is calculated at the package rates and billed as
overage. The client is package-billed for the recurring fee and overage-billed
only when usage exceeds the allowance.

- Real-Time Billing: **disabled** — enabling it defeats the purpose of metering
- Free Minutes: the included allowance (the meter for the billing period)
- Package rates configured so usage beyond the meter resolves a rate — tariff assignment and/or custom rates with billing increments
- Autobill cron scheduled to rate usage and invoice overage each period
- Client VoIP credit on account (as with all models), with Low Balance Threshold and AutoSuspend configured per your suspension policy

Special-Rate Product
~~~~~~~~~~~~~~~~~~~~

*Specific destinations or premium numbers billed from a dedicated rate table.*

- Special Rates rules defined for the product (patterns or prefixes with their own pricing)
- Tariff and/or custom rates continue to apply to non-matching calls
- Compatible with both timing engines — real-time deduction or autobill invoicing

Hybrid and Multi-Product Designs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because these elements combine per product, a single WHMCS installation can sell prepaid lines, metered bundles, and special-rate products side by side — including for a single client holding multiple services. Combining ictVoIP Billing with the other addons and server modules in the ecosystem (provisioning, fax, transcription, and additional PBX platforms) extends this further.

Common Misconfigurations
-------------------------

.. list-table::
   :header-rows: 1
   :class: fit-table
   :widths: 40 60

   * - Symptom
     - Likely Cause
   * - "Free minutes are applied to every call"
     - Real-Time Billing enabled on a metered product — per-call free minutes are correct on that path
   * - "Free calls show zero usage"
     - Real-Time Billing records billed usage, not allowance consumption — metering lives on the Autobill path
   * - "Calls bill $0"
     - No tariff prefix matched and the applicable custom rate is blank — see :doc:`/admin/packages`
   * - "Service suspended despite included minutes remaining"
     - AutoSuspend is credit-based — on a metered product, suspension policy is your business decision

Designing your own model
-------------------------

The combinations shown here are a starting point, not a catalog. Many more models are possible by combining the ictVoIP Billing ecosystem with WHMCS billing features, and not every combination can be documented — exploring the design space is part of the ITSP platform designer's role.

If your business model does not map cleanly onto these recipes, the correct starting point is a **sandbox product**: configure one package and one test service end-to-end, place test calls, and verify the rating and invoicing behavior before launch. The platform supports many combinations — validating your specific combination in the sandbox is part of product design.

.. note::

   Support plans include guided configuration assistance within the designed
   functionality of the platform. Business model decisions — pricing,
   allowances, thresholds, suspension policy — remain yours to make.

.. seealso::

   - :doc:`/admin/packages` — package configuration and rate resolution
   - :doc:`/admin/autobill` — the postpaid/metered billing engine
   - :doc:`/admin/billing_management` — billing operations
   - :doc:`/clientadmin/autosuspend_testing` — suspension behavior and testing
