❓ Frequently Asked Questions
###########################

The ictVoIP Billing documentation covers most setup, configuration, and
operational tasks. If you run into a problem, the questions below may
help you identify whether it is a configuration issue or something that
should be reported to support.

Installation & Activation
*************************

.. admonition:: I uploaded the files, but the ictVoIP Billing addon does not show up in WHMCS.

   Make sure all files were extracted and merged into the WHMCS document
   root while preserving the directory structure. After uploading, log in
   to WHMCS as an admin and go to **System Settings → Apps &
   Integrations → Addon Modules**. If the addon is already listed as
   active, click **Deactivate** and then **Activate** again to trigger the
   database setup. Also verify that PHP and ionCube Loader meet the
   supported versions.

.. admonition:: I activated the addon, but the health check reports missing tables.

   The activation step creates the required database tables automatically.
   If the tables are missing, the most common cause is that activation did
   not complete, or database permissions prevented table creation.
   Deactivate and activate the addon again. If the issue persists, contact
   ictVoIP support.

Providers & PBX Servers
************************

.. admonition:: The provider test fails with an authentication error.

   Verify that the API credentials are correct and that the WHMCS server
   public IP is whitelisted with the provider. Most VoIP providers
   require IP whitelisting for API access. The WHMCS server IP can be
   found in the server network settings or by asking your hosting provider.

.. admonition:: The PBX server test connection fails.

   Check the following:

   * The FusionPBX server module files are installed on WHMCS.
   * The WHMCS server public IP is in the FusionPBX
     ``chkcon_whitelist.conf`` file.
   * The API integration user is a superadmin in the FusionPBX global
     domain.
   * You are using either the username and password, or a valid access
     hash / API token.
   * HTTPS is reachable and the SSL certificate is valid.

   Run the connection test from **Client Services Dashboard → FusionPBX
   Server Validation / Server Provisioning Settings** for detailed output.

.. admonition:: I can log in to FusionPBX directly, but WHMCS says the API is unreachable.

   Web admin access and API access are not the same. The API uses an
   IP/CIDR whitelist and a dedicated integration user. Make sure the WHMCS
   IP is whitelisted and that the API user has superadmin privileges in
   the global domain.

Packages, Tariffs & Billing
*****************************

.. admonition:: Calls are not being billed on the invoice.

   Start by checking the package configuration:

   * The package is linked to the correct provider.
   * The tariff or custom rates are configured.
   * The product in WHMCS is using the right package.
   * CDRs are being collected from the PBX.

   Next, run the Autobill test and confirm it completes before the WHMCS
   daily CRON. If Autobill runs after the WHMCS daily CRON, the invoice
   may not be generated until the next billing cycle.

.. admonition:: Autobill runs but invoices are not created.

   Autobill must run **before** the WHMCS daily CRON and the client service
   must be due on the run date. Verify the CRON schedule and the
   timezone. On AlmaLinux 9 / systemd-based hosts, set the ``TZ=``
   variable explicitly in the CRON job.

.. admonition:: The invoice total does not match my expected usage.

   Check that the correct tariff is selected and that any special number
   billing or custom rates are configured as intended. Remember that free
   minutes, markups, and rounding rules can affect the final total. A
   partial CDR collection or missing CDRs can also cause a mismatch.

Client Services & Provisioning
********************************

.. admonition:: I created a tenant in Client Services, but it does not appear on the PBX.

   Review the dry-run output before pushing changes. Make sure the PBX
   server connection is active, the provider is selected, and the domain
   name is valid. If the dry-run reports no changes, the domain may already
   exist, or the product custom fields may not be set correctly.

.. admonition:: Extensions are not assigned to the correct client.

   Verify that the product custom fields (such as sub-account, DID, and
   server/domain) are populated on the client product. FusionPBX product
   assignment is automated through extension assignment; the tenant and
   extension fields on the client profile are read-only.

.. admonition:: ACL or gateway changes are not pushed to FusionPBX.

   Use the dry-run preview in Client Services before pushing. The push
   operation requires a working PBX API connection and the WHMCS IP
   whitelist. If the push fails, check the Client Services logs for the
   specific error returned by the PBX.

Call Recordings & Transcriptions
********************************

.. admonition:: I cannot play or download a call recording.

   Verify that the VoIP.ms API IP whitelist includes the WHMCS server IP.
   The module fetches MP3 audio on demand from VoIP.ms; it does not store
   recordings locally. If the API request is rejected, playback and
   download will fail.

.. admonition:: Transcriptions are not showing in the client area.

   Check the service custom fields and confirm that the DID and
   sub-account are correct. The transcription module fetches email-based
   transcripts from the provider; ensure the provider account is active and
   API credentials are valid.

ictVoIP Box
***********

.. admonition:: A new order completed, but the FusionPBX gateway was not created.

   Make sure a **Gateway Template** is assigned to the provider in
   ictVoIP Box. Go to **Addons → ictVoIP Box → Gateway Templates** and
   select a template that has already been tested in FusionPBX. Without a
   mapped template, ictVoIP Box cannot create the SIP gateway for the new
   tenant. Also verify the provider order produced valid credentials (for
   example, a DIDWW voice-out trunk or a VoIP.ms subaccount).

.. admonition:: Calls fail after a new DIDWW or VoIP.ms order is provisioned.

   This usually means the assigned gateway template is missing or
   incorrect. Confirm the template was tested on a real FusionPBX gateway
   before it was selected in ictVoIP Box. The template must match the
   provider's authentication and registration requirements. For DIDWW, the
   per-trunk username and password are generated by DIDWW; for VoIP.ms,
   the per-order subaccount credentials are used. The template provides the
   remaining gateway fields such as proxy, realm, and codec profile.

.. admonition:: Inbound or outbound routes are missing after provisioning.

   Assign an **inbound** and an **outbound route template** to each
   provider in **Addons → ictVoIP Box → Route/Destination Templates**.
   Route templates must be created and tested in the ictVoIP Billing addon
   first. A missing or untested route template can break all inbound or
   outbound calling for the tenant.

.. admonition:: A template I created in ictVoIP Billing is not shown in ictVoIP Box.

   ictVoIP Box only shows templates that are available for the selected
   provider. Verify the template is saved and associated with the correct
   provider (or set to ``Global``) in ictVoIP Billing. Also test the
   template in FusionPBX before trying to assign it.

.. admonition:: The same template works for one order but not another.

   Templates are merged with provider-specific values. If an order produces
   unexpected credentials or the provider trunk settings change, the
   resulting gateway may differ from what the template expects. Re-test the
   template with the current provider settings and update the template as
   needed.

When to Contact Support
************************

.. admonition:: I have checked the FAQ and docs, but the issue is still happening.

   If you have reviewed the relevant documentation and confirmed the
   configuration is correct, but the issue still occurs, contact
   `support@ictvoip.ca` with:

   * The specific page or feature involved.
   * Any error messages shown in the WHMCS admin or module logs.
   * The provider and PBX server names.
   * Whether the issue is reproducible on a test client or service.
