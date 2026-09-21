Provisioning Workflows
======================

.. contents::
   :local:
   :depth: 2

Provisioning (Standard)
-----------------------

**Timeline: Admin-initiated (typically 5-15 minutes)**

1. **Client Orders** Provider DID through shopping cart
2. **Order Created** in provisioning database
3. **Admin Queue** displays order with status ``Pending``
4. **Admin Reviews** order in provisioning queue
5. **Admin Clicks "Provision"** button
6. **System Executes**:

   * Creates/verifies FusionPBX tenant domain
   * Creates admin user with credentials
   * Provisions extensions
   * Configures Provider SIP gateway
   * Creates inbound route for DID
   * Creates outbound route
   * Sends welcome email with credentials

7. **Status Updated** to ``Completed``

**Admin Actions Required:**

* Review order details
* Click "Provision" button
* Verify provisioning success

**Gateway Configuration:**

* SIP username from Provider credentials
* SIP password from Provider credentials
* Proxy: ``{location}.provider1.example`` (e.g., ``toronto.provider1.example``)
* Port: 5060 (UDP) or 5061 (TLS)

|

.. image:: ../_static/images/admin/ictvoipbox_provisioning_standard.png
   :width: 600px
   :align: center
   :alt: VoIP.ms Provisioning Workflow

|

Provider Provisioning (Regulatory)
----------------------------------

**Timeline: 1-5 business days (due to DIDWW verification)**

Provider requires regulatory compliance for certain countries. The provisioning process includes identity verification and document upload.

Phase 1: Order Review
^^^^^^^^^^^^^^^^^^^^^

* **Client Orders** Provider DID with regulatory information
* **Order Created** in pending orders database
* **Status**: ``pending_review``
* **Queue Display**: Purple/lavender highlight with ⚠️ badge

**Admin Actions:**

1. Click **"View"** to review regulatory details
2. Verify client-provided information (identity, address, business)
3. Proceed to Phase 2

|

.. image:: ../_static/images/admin/ictvoipbox_order_details.png
   :width: 600px
   :align: center
   :alt: Regulatory Order Review

|

Phase 2: Submit Identity to Provider
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* **Admin Clicks** "Submit to Provider" button
* **System Executes**:

  * Creates Provider Identity resource via API
  * Creates Provider Address resource via API
  * Links address to identity
  * Stores ``provider2_identity_id`` and ``provider2_address_id``

* **Status**: ``identity_address_confirmed``
* **Queue Display**: ✅ badge "Identity Confirmed - Upload Proofs"

**Admin Actions:**

1. Click "Submit to Provider"
2. Wait for API response
3. Proceed to Phase 3

Phase 3: Upload Proof Documents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* **Admin Clicks** "Upload Proofs to Provider" button
* **System Opens** Provider portal in new tab
* **Admin Uploads** documents in Provider portal:

  * Proof of Identity (passport, ID, driver's license)
  * Proof of Address (utility bill, bank statement within 3 months)
  * Business Proof (company registration, tax certificate)

* **Admin Returns** to ictVoIP Box and clicks "Mark Docs Uploaded"
* **Status**: ``documents_uploaded``
* **Queue Display**: 📤 badge "Docs Uploaded to Provider"

**Admin Actions:**

1. Click "Upload Proofs to Provider"
2. Upload documents in Provider portal
3. Return to ictVoIP Box
4. Click "Mark Docs Uploaded"
5. Proceed to Phase 4

|

.. image:: ../_static/images/admin/ictvoipbox_upload.png
   :width: 600px
   :align: center
   :alt: Document Upload Process

|

Phase 4: Place DID Order
^^^^^^^^^^^^^^^^^^^^^^^^

**Admin Clicks** "Place Order" button and the **DID Ordering Modal** appears.

DID Ordering Modal
""""""""""""""""""

The DID ordering modal provides a final opportunity to verify or change the selected DID before submitting the order to the provider. This is critical because the originally selected DID may no longer be available.

**Modal Sections:**

**1. Original DID Availability Check**

* System checks if originally selected DID is still available
* If unavailable, displays warning: "Original DID No Longer Available"
* Shows original DID number and message to select alternative

**2. Select Alternative DID**

* **Available DIDs** dropdown displays DIDs from same location
* Format: ``[DID Number] - Setup: $X.XX, Monthly: $X.XX``
* Select from dropdown to choose alternative DID
* DID information updates automatically when selection changes

**3. DID Information Display**

* **DID Number**: Selected number with clickable link
* **City**: Location/rate center
* **Country**: Country code (e.g., ZA for South Africa)
* **Rate**: Per-minute rate for calls (e.g., $0.01/min)

**4. Capacity Type Selection**

* **Select Capacity** dropdown
* Options:
  
  * Pay per minute (default) - Metered billing
  * Unlimited - Flat-rate unlimited calling (if available)
  * Custom capacity plans (provider-specific)

* Billing type determines how DID usage is charged

**5. Pricing Breakdown**

* **Monthly**: Recurring monthly DID fee
* **Setup**: One-time activation fee
* **Subtotal**: Monthly + Setup
* **VAT**: Tax amount (if applicable)
* **Total for DID(s)**: Final total cost

**Modal Actions:**

* **Cancel**: Close modal without ordering
* **Place Order**: Submit order to provider API

|

.. image:: ../_static/images/admin/ictvoipbox_did_ordering.png
   :width: 600px
   :align: center
   :alt: DID Ordering Modal

|

**After Clicking "Place Order":**

* **System Executes**:

  * Creates Provider Proof resource
  * Creates Provider DID Order via API
  * Links order to verified identity and address
  * Stores ``provider2_order_id``

* **Status**: ``order_placed``
* **Queue Display**: ⏳ badge "Awaiting Provider"

**Admin Actions:**

1. Click "Place Order" to open modal
2. Verify DID availability or select alternative
3. Choose capacity type (pay per minute or unlimited)
4. Review pricing breakdown
5. Click "Place Order" in modal to submit
6. Wait for API response
7. Proceed to Phase 5 (monitoring)

Phase 5: Monitor DIDWW Order Status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* **Admin Periodically Clicks** "Check Provider Status" button
* **System Polls** Provider API for order status
* **Possible Statuses**:

  * ``awaiting_registration``: Provider processing (⏳ badge)
  * ``blocked``: Order blocked (⛔ badge - contact Provider support)
  * ``terminated``: Order terminated (🛑 badge - contact Provider support)
  * ``active``: Order approved (✅ badge "Provider Active - Ready to Sync")

**Admin Actions:**

1. Check status daily during business hours
2. If blocked/terminated, contact Provider support
3. When status is ``active``, proceed to Phase 6

Phase 6: Sync DID and Provision to FusionPBX
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* **Admin Clicks** "Provision to FusionPBX" button
* **System Executes**:

  * Retrieves Provider trunk credentials
  * Creates FusionPBX tenant domain
  * Creates admin user
  * Provisions extensions
  * Configures Provider SIP gateway
  * Creates inbound route for DID
  * Creates outbound route
  * Sends welcome email with credentials

* **Status**: ``completed``
* **Queue Display**: ✅ badge "Completed"

**Gateway Configuration:**

* SIP username from Provider trunk credentials
* SIP password from Provider trunk credentials
* Proxy: ``out.provider2.example`` (default, can be overridden in template)
* Port: 5060 (UDP) or 5061 (TLS)

|

.. image:: ../_static/images/admin/ictvoipbox_provisioning2.png
   :width: 600px
   :align: center
   :alt: DIDWW Complete Provisioning

|

Admin Queue Management
======================

.. contents::
   :local:
   :depth: 2

Provisioning Queue Interface
-----------------------------

Navigate to **Addons → ictVoIP Box → Provisioning Queue**

The provisioning queue displays all pending, in-progress, and completed orders. Administrators can review order details, manage provisioning workflows, and monitor status.

**Queue Columns:**

* **Order ID**: WHMCS order identifier
* **Client**: Client name and contact information
* **Product**: Product/bundle ordered
* **Provider**: VoIP.ms or DIDWW
* **DID**: Selected phone number
* **Status**: Current provisioning status with badge
* **Actions**: Available admin actions based on status

**Status Badges:**

* **Pending** (blue): Awaiting admin review
* **In Progress** (yellow): Provisioning in progress
* **Identity Confirmed** (green): Provider identity submitted
* **Docs Uploaded** (purple): Documents uploaded to Provider
* **Awaiting Provider** (orange): Waiting for Provider verification
* **Active** (green): Provider order approved, ready to provision
* **Completed** (green): Fully provisioned
* **Failed** (red): Provisioning error

|

.. image:: ../_static/images/admin/ictvoipbox_provisioning_queue.png
   :width: 600px
   :align: center
   :alt: Provisioning Queue Interface

|

Regulatory Data Review
----------------------

For DIDWW orders, administrators must review regulatory information before submission.

**Regulatory Details Modal:**

1. Click **"View"** button for Provider order
2. Review sections:

   * **Identity Information**: Name, date of birth, phone, email
   * **Address Information**: Country, city, postal code, street address
   * **Business Information**: Company name, registration number, tax ID

3. Verify information is complete and accurate
4. Check for common issues:

   * Missing required fields
   * Invalid date formats
   * Incomplete addresses
   * Mismatched business information

**If Information is Incomplete:**

* Contact client via support ticket
* Request corrected information
* Update order notes with issue details
* Do not proceed to DIDWW submission until corrected

**If Information is Complete:**

* Proceed to submit identity to Provider

|

.. image:: ../_static/images/admin/ictvoipbox_order_details.png
   :width: 600px
   :align: center
   :alt: Regulatory Details Modal

|

Document Upload Requirements
-----------------------------

DIDWW requires proof documents for regulatory compliance.

**Required Documents:**

**1. Proof of Identity (One of the following):**

* Government-issued passport (photo page)
* National ID card (front and back)
* Driver's license (front and back)

**Document Requirements:**

* Clear, legible scan or photo
* All corners visible
* No glare or shadows
* Color preferred
* File format: JPG, PNG, or PDF
* Maximum file size: 10MB per document

**2. Proof of Address (One of the following, dated within 3 months):**

* Utility bill (electricity, water, gas)
* Bank statement
* Lease agreement or rental contract
* Government-issued document with address

**Document Requirements:**

* Must show full name matching identity document
* Must show complete address matching order
* Must be dated within last 3 months
* Clear, legible scan or photo
* File format: JPG, PNG, or PDF

**3. Business Proof (For business DIDs):**

* Company registration certificate
* Business license
* Tax registration certificate
* VAT registration document

**Document Requirements:**

* Must show company name matching order
* Must show registration number
* Must be current and valid
* Clear, legible scan or photo
* File format: JPG, PNG, or PDF

.. warning::
   **Common Rejection Reasons:**
   
   * Document expired or too old
   * Text not legible
   * Document corners cut off
   * Address doesn't match order information
   * Name doesn't match identity information
   * Business registration doesn't match company name

