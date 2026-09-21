Glossary
########

.. glossary::

   ACL
      Access Control List. A named set of rules that define which IP
      addresses or CIDRs are allowed or denied access to a PBX tenant
      or service. Managed in ictVoIP Billing Client Services and
      pushed to FusionPBX.

   Autobill
      Automated billing process that collects rated CDRs and generates
      WHMCS invoices for VoIP usage. Autobill runs as a scheduled CRON
      job before the WHMCS daily CRON.

   CDR
      Call Detail Record. A record of a single phone call including
      source, destination, duration, and direction. CDRs are collected
      from the PBX, rated, and used for billing.

   Client Services
      The WHMCS admin dashboard in ictVoIP Billing for managing
      FusionPBX tenants, extensions, gateways, destinations, outbound
      routes, and ACLs per provider/PBX.

   Country code
      The numeric dialing prefix assigned to a country. Used to match
      CDR destinations to the correct tariff and package rate.

   Diarization
      Speaker identification process in call transcription that labels
      each speaker's utterances in the transcript output.

   DID
      Direct Inward Dialing number. A phone number assigned to a client
      or service for inbound and/or outbound calls.

   Domain
      In FusionPBX, a tenant domain. A logical container for users,
      extensions, gateways, and dialplans for a single customer.

   Extension
      A phone line or endpoint within a PBX domain, typically mapped to
      a user, device, or DID.

   FusionPBX
      An open-source multi-tenant PBX platform based on FreeSWITCH that
      integrates with ictVoIP Billing for provisioning and billing.

   Gateway
      A SIP trunk or carrier connection configured on the PBX to route
      inbound and outbound calls.

   Package
      A WHMCS product configuration that links a provider, tariff,
      country code, and rate settings to a client's VoIP service.

   Package rates
      The billing rates assigned to a package, including free minutes,
      markup, and overage charges.

   Provider
      A VoIP trunk or DID provider (for example, VoIP.ms or DIDWW)
      configured in ictVoIP Billing for routing, provisioning, and
      rating.

   Rate card
      A CSV or other structured list of prefixes and per-minute rates
      provided by a VoIP provider. Imported into ictVoIP Billing as a
      tariff.

   Special Number Billing
      A billing mode that matches specific destination patterns (such
      as 1300/1800) and applies flat or special rates instead of the
      standard tariff.

   Tariff
      A collection of rates for one or more destinations, usually
      imported from a provider rate card. Tariffs are linked to
      packages for billing.

   Tenant
      An isolated customer environment within a multi-tenant PBX. In
      ictVoIP Billing this is typically managed as a FusionPBX domain.

   Tenant domain
      The FusionPBX domain that represents a single tenant. Contains
      extensions, gateways, and dialplans for that tenant.

   VoIP
      Voice over Internet Protocol. Telephony services delivered over
      an IP network rather than traditional phone lines.

   WHMCS
      Web Host Manager Complete Solution. The billing and client
      management platform on which ictVoIP Billing runs.
