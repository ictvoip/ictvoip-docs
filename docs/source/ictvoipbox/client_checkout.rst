Client Checkout Experience
===========================

.. contents::
   :local:
   :depth: 2

Provisioning Methods
--------------------

ictVoIP Box supports **three provisioning methods**, all controlled by administrators or client checkout:

**1. Client Portal Orders**

Clients place orders through the WHMCS client area using the 4-step checkout wizard. Orders enter pending state and await admin approval before provisioning.

* **Access**: Client area shopping cart
* **Flow**: Complete 4-step wizard → Order placed → Admin reviews → Admin provisions
* **Use Case**: Standard customer self-service ordering

**2. Admin Order Placement**

Administrators can place orders directly from the WHMCS admin area on behalf of clients, with immediate access to provisioning controls.

* **Access**: WHMCS Admin → Orders → Add New Order
* **Flow**: Select client → Add product → Complete wizard → Immediate provisioning access
* **Use Case**: White-glove onboarding, enterprise clients, pre-configured deployments

**3. Admin Impersonation**

Administrators can impersonate a client account to place orders with the client's context, useful for quick turnaround provisioning or assisted onboarding.

* **Access**: WHMCS Admin → Clients → Login as Client
* **Flow**: Impersonate client → Place order via client portal → Return to admin → Provision
* **Use Case**: Support-assisted ordering, troubleshooting checkout issues, client training

All three methods result in the same automated provisioning sequence once the administrator confirms the order.

Checkout Wizard Flow
--------------------

The ictVoIP Box checkout wizard guides clients (or administrators placing orders) through a streamlined 4-step process to configure their new PBX service. The wizard dynamically adapts based on the selected provider and regulatory requirements.

Step 1: Company Details
^^^^^^^^^^^^^^^^^^^^^^^^

**Purpose**: Collect tenant identification and contact information

The first step captures essential company information that will be used to create the FusionPBX tenant domain and admin user account.

**Fields Collected:**

* **Company Name**: Used to generate tenant domain (e.g., ``acmecorp.pbx.example.com``)
* **Contact Name**: Primary contact for the PBX service
* **Contact Email**: Admin user email for credentials and notifications
* **Contact Phone**: Support contact number

**Validation:**

* All fields are required
* Company name must be unique (no duplicate tenant domains)
* Email must be valid format
* Phone number must be valid format

|

.. image:: ../_static/images/clientarea/cart_ordering_1.png
   :width: 600px
   :align: center
   :alt: Checkout Step 1 - Company Details

|

Step 2: DID Selection
^^^^^^^^^^^^^^^^^^^^^^

**Purpose**: Select primary phone number for the PBX service

The second step presents available DIDs based on the product's mapped provider (VoIP.ms or DIDWW). Clients can search and filter by country, region, rate center, and specific number patterns.

**Search Filters:**

* **Country**: Select from available countries
* **Province/State**: Filter by province or state (if applicable)
* **Rate Center**: Filter by rate center or city
* **Number Pattern**: Search for specific number patterns (e.g., ``*555*``)

**DID Display:**

* **Number**: Full E.164 formatted number
* **Location**: City, state/province, country
* **Monthly Rate**: Recurring monthly cost
* **Setup Fee**: One-time activation fee (if applicable)

**Actions:**

* Click **"Select"** to choose DID and proceed
* Search and filter to find desired number
* View pricing before selection

|

.. image:: ../_static/images/clientarea/cart_ordering_2.png
   :width: 600px
   :align: center
   :alt: Checkout Step 2 - DID Selection

|

Step 2.5: Regulatory Compliance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Purpose**: Collect regulatory information for Providers

.. important::
   **This step only appears for Provider products** that require regulatory compliance (e.g., South Africa, EU countries, UK). if normal DID ordering we skip directly to Step 3.

When a Provider DID is selected, the wizard presents a regulatory compliance form to collect identity, address, and business information required by the provider.

**Identity Information:**

* **Full Name**: Legal name matching government-issued ID
* **Date of Birth**: Format: YYYY-MM-DD
* **Phone Number**: Contact phone number
* **Email Address**: Contact email address

**Address Information:**

* **Country**: Select from regulatory countries
* **City**: City name (used to auto-match regulatory area)
* **Postal Code**: ZIP or postal code
* **Street Address**: Complete street address

**Business Information (For Business DIDs):**

* **Company Name**: Legal business name
* **Registration Number**: Business registration number
* **Tax ID**: Tax identification number or VAT number

**Document Upload Requirements:**

The form displays required documents that must be uploaded during admin review:

* **Proof of Identity**: Passport, national ID, or driver's license
* **Proof of Address**: Utility bill, bank statement (within 3 months)
* **Business Proof**: Company registration, tax certificate (for business DIDs)

.. warning::
   **Document Upload Timing:**
   
   Documents are NOT uploaded during client checkout. The client provides regulatory information in this step, and the administrator uploads proof documents during the admin review process (see :ref:`document-upload-phase`).

**Validation:**

* All required fields must be completed
* Date of birth must be valid date
* City name must match DIDWW regulatory areas
* Business fields required only for business DID types

|

.. image:: ../_static/images/clientarea/cart_ordering_2_5.png
   :width: 600px
   :align: center
   :alt: Checkout Step 2.5 - Regulatory Compliance Form

|

Step 3: Tenant & Extensions Preview
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Purpose**: Review tenant configuration and extension allocation

The third step displays a summary of the PBX tenant that will be created, including the tenant domain, FusionPBX server assignment, and the number of extensions (seats) included with the selected product.

**Tenant Configuration:**

* **Tenant Domain**: Auto-generated from company name (e.g., ``acmecorp.pbx.example.com``)
* **FusionPBX Server**: Assigned server from product mapping
* **Max Seats**: Number of extensions included in the product bundle

**Extension Preview:**

* **Included Extensions**: Number of seats from product bundle quantity
* **Extension Range**: Preview of extension numbers (e.g., ``1001-1010`` for 10 seats)
* **Billing**: Monthly recurring cost per seat (if applicable)

**Editable Fields:**

* **Tenant Domain**: Can be customized if desired (must remain unique)

**Actions:**

* Review configuration
* Edit tenant domain if needed
* Proceed to admin user creation

|

.. image:: ../_static/images/clientarea/cart_ordering_3.png
   :width: 600px
   :align: center
   :alt: Checkout Step 3 - Tenant & Extensions Preview

|

Step 4: Create Admin User
^^^^^^^^^^^^^^^^^^^^^^^^^^

**Purpose**: Configure admin user credentials for FusionPBX access

The final step collects admin user details that will be used to create the primary administrator account on the FusionPBX tenant.

**Admin User Configuration:**

* **Username**: Admin login username (default: ``admin``, can be customized)
* **Password**: Strong password for admin account
* **Confirm Password**: Password confirmation
* **Email**: Admin email for notifications (pre-filled from Step 1)
* **Timezone**: Tenant timezone for call logs and scheduling
* **Language**: Interface language (default: English)
* **Group**: User group assignment (default: ``superadmin``)

**Password Requirements:**

* Minimum 8 characters
* Must contain uppercase and lowercase letters
* Must contain at least one number
* Special characters recommended

**Server Assignment Display:**

* **FusionPBX Server**: Displays assigned server from product mapping
* **Tenant Domain**: Displays final tenant domain from Step 3

**Actions:**

* Click **"Create User & Complete Order"** to submit order
* Order is placed in pending state for admin review
* Client receives order confirmation email

|

.. image:: ../_static/images/clientarea/cart_ordering_4.png
   :width: 600px
   :align: center
   :alt: Checkout Step 4 - Create Admin User

|

Post-Checkout Order Status
---------------------------

After completing the checkout wizard, the order is placed in a **pending provisioning** state. The client receives an order confirmation email and can view the order status in their client area.

**Client View:**

* Order appears in **My Orders** with status ``Pending``
* Order details show selected DID, tenant domain, and product information
* Client cannot modify order after submission

**Admin View:**

* Order appears in **Provisioning Queue** (see :ref:`admin-queue-management`)
* Admin can review order details and regulatory information
* Admin controls when provisioning begins

**Next Steps:**

1. Administrator reviews order in provisioning queue
2. For DIDWW orders, administrator completes regulatory workflow
3. Administrator triggers provisioning when ready
4. Client receives welcome email with credentials upon completion

