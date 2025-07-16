FusionPBX Configuration Guide
============================

Overview
--------

This guide covers the configuration of ictVoIP Billing integration with FusionPBX, including WHMCS module setup, API configuration, and system settings.

WHMCS Module Configuration
-------------------------

**Note**: The ictsipreg WHMCS module is a separate optional addon that provides WHMCS integration capabilities. This module is not included in the standard FusionPBX customizations and requires separate licensing and installation.

Module Installation
~~~~~~~~~~~~~~~~~~

1. **Obtain Module Files**
   * Contact ictVoIP for the ictsipreg WHMCS module
   * Module is provided as a separate package with its own licensing
   * Follow the WHMCS module installation guide provided with the package

2. **Install Module in WHMCS**
   ::

       # Copy module to WHMCS modules directory
       cp -r ictsipreg/ /var/www/html/whmcs/modules/servers/ictsipreg/

3. **Enable Module in WHMCS**
   * Go to **Setup > Products/Services > Servers**
   * Click **Add New Server**
   * Select **ictVoIP SIP Registration** from dropdown
   * Configure server settings

Server Configuration
~~~~~~~~~~~~~~~~~~~

**Required Fields:**

* **Server Name**: Descriptive name (e.g., "ictVoIP FusionPBX Server")
* **Hostname**: FusionPBX server IP or domain
* **Username**: FusionPBX admin username
* **Password**: FusionPBX admin password
* **Port**: 443 (HTTPS)
* **Secure**: Check if using HTTPS

**Optional Fields:**

* **Access Hash**: For additional security
* **Notes**: Internal notes about this server

Product Configuration
~~~~~~~~~~~~~~~~~~~~

**Product Setup:**

1. **Create Product Group**
   * Go to **Setup > Products/Services**
   * Create new group: "VoIP Products"

2. **Create Product**
   * **Product Type**: Shared Hosting
   * **Module**: Fusionpbx
   * **License**: Enter your FusionPBX Server Module License Key

**Module Settings:**

* **Domain**: Default tenant domain
* **Extensions**: 1122 | 2233 | 2234 | 2235
* **Extension Length**: Number of digits (usually 4)
* **Default Password**: Not required
* **Email Template**: Welcome email template

API Configuration
----------------

Authentication Setup
~~~~~~~~~~~~~~~~~~~

The FusionPBX module requires secure API authentication to communicate with your FusionPBX server.

**Required Credentials:**

* **FusionPBX URL**: Your FusionPBX server address
* **Admin Username**: FusionPBX administrator username
* **Admin Password**: Secure administrator password
* **Default Domain**: Primary tenant domain

**Security Best Practices:**

* Use HTTPS  and Whitelists for all API communications
* Implement API rate limiting
* Use strong, unique passwords
* Enable IP whitelisting if possible
* Regularly rotate API credentials

API Whitelist Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The `/chkcon.php` endpoint now uses an IP and CIDR-based whitelist for authentication. Only requests originating from trusted IP addresses or subnets listed in the `chkcon_whitelist.conf` file will be granted API access.

- **No username or password is required** for whitelisted IPs.
- All other requests will be denied with a clear error message.
- The whitelist is managed in a plain text file (`chkcon_whitelist.conf`), one IP or CIDR per line.

**Sample whitelist file:**
::

    # chkcon_whitelist.conf
    192.168.1.20
    192.168.1.0/24

**WHMCS Integration Note:**
When configuring the FusionPBX server in WHMCS, the "Test Connection" button now checks API access based on the IP whitelist. Username and password fields are not required for this endpoint. Ensure your WHMCS server's public IP is included in `chkcon_whitelist.conf` on the FusionPBX server.

**Response Examples:**

.. code-block:: json

    {
      "success": 1,
      "message": "API Access Granted: Whitelisted IP"
    }

    {
      "success": 0,
      "message": "API Access Denied: Only whitelisted IPs may access this endpoint."
    }

API Endpoints
~~~~~~~~~~~~~

The following API endpoints are available for integration and automation. All endpoints require secure authentication. These examples illustrate the design structure and usage patterns for typical operations:

**Status Endpoint**

Checks server connectivity and authentication.

.. code-block:: bash

    curl -X POST https://your-fusionpbx.com/app/status/index.php \
      -d "username=admin&password=your-password"

**Registration Endpoint**

Checks SIP device registration status for a given extension and domain.

.. code-block:: bash

    curl -X POST https://your-fusionpbx.com/app/registrations/check_registration.php \
      -d "username=admin&password=your-password&extension=1001&tenant_domain=yourdomain.com"

**Gateway Provisioning Endpoint**

Manages SIP gateway provisioning.

.. code-block:: bash

    curl -X POST https://your-fusionpbx.com/app/gateways/provision.php \
      -d "username=admin&password=your-password&gateway_name=test_gateway"

**Extension Management Endpoint**

Example for creating or updating an extension (actual endpoint and parameters may vary by deployment):

.. code-block:: bash

    curl -X POST https://your-fusionpbx.com/app/extensions/manage.php \
      -d "username=admin&password=your-password&action=create&extension=1002&domain=yourdomain.com"

**Call Detail Records (CDR) Endpoint**

Retrieves call detail records for reporting or billing.

.. code-block:: bash

    curl -X POST https://your-fusionpbx.com/app/xml_cdr/export_cdr.php \
      -d "username=admin&password=your-password&date_start=2024-01-01&date_end=2024-01-31"

These examples are for illustration only. Actual endpoint paths and parameters may differ depending on your deployment and customizations. Always refer to your deployment's API documentation for the most accurate details.

Database Configuration
~~~~~~~~~~~~~~~~~~~~~

**PostgreSQL Requirements:**

The module requires access to the FusionPBX PostgreSQL database with the following permissions:

* Read access to extension tables
* Read access to domain configuration
* Read access to gateway settings
* Read access to call detail records
* Read access to system settings

**Required Database Tables:**

* Extension management tables
* Domain/tenant configuration tables
* Gateway configuration tables
* Call detail record tables
* System settings tables

**Database Security:**

* Use dedicated database user with minimal required permissions
* Enable SSL connections when possible
* Implement connection pooling for performance
* Regular database backups and monitoring

System Configuration
-------------------

FusionPBX Settings
~~~~~~~~~~~~~~~~~~

**Theme Configuration:**

The module supports custom theme integration for branding purposes. Configure your preferred login template and styling through the FusionPBX admin interface.

**Domain Settings:**

Configure multi-tenant domain settings to support multiple client environments. Each domain can have its own extensions, gateways, and settings.

Web Server Configuration
~~~~~~~~~~~~~~~~~~~~~~~~

**nginx Configuration:**

Ensure your nginx configuration properly handles API endpoints and includes appropriate security headers. The web server should be configured to:

* Serve static files efficiently
* Handle PHP processing
* Implement security headers
* Support SSL/TLS encryption

**Apache Configuration:**

For Apache deployments, configure virtual hosts with proper directory permissions and security settings. Include:

* Document root configuration
* Directory access controls
* Security header implementation
* SSL certificate handling

PHP Configuration
~~~~~~~~~~~~~~~~~

**Required Extensions:**

The module requires the following PHP extensions:

* PostgreSQL database connectivity
* cURL for API communications
* JSON for data processing
* OpenSSL for encryption
* Multibyte string support

**Security Settings:**

Implement proper PHP security hardening:

* Disable PHP version exposure
* Configure error logging
* Set appropriate execution limits
* Enable secure session handling

FreeSWITCH Configuration
~~~~~~~~~~~~~~~~~~~~~~~~

**SIP Profile Settings:**

Configure FreeSWITCH SIP profiles for proper extension registration and call handling. Ensure profiles are properly configured for:

* Internal extension registration
* External gateway connectivity
* Security and authentication
* Call routing and processing

**CDR Configuration:**

Enable XML CDR for call detail record collection. Configure CDR settings for:

* Call logging and billing
* Database storage
* Error handling
* Performance optimization

Billing Integration Setup
------------------------

WHMCS Product Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~

**Product Features:**

The module provides comprehensive VoIP service management through WHMCS:

* **Extension Management**: Automated extension provisioning and management
* **SIP Credentials**: Secure credential generation and distribution
* **Call Recording**: Configurable recording options
* **Voicemail**: Automated voicemail setup and configuration
* **Call Forwarding**: Flexible forwarding rule management

**Pricing Tiers:**

Configure multiple service tiers to meet different client needs:

* **Basic**: Single extension with essential features
* **Professional**: Multiple extensions with advanced features
* **Enterprise**: Unlimited extensions with full feature set

Automation Rules
~~~~~~~~~~~~~~~~

**Provisioning Workflow:**

The module automates the complete service provisioning process:

1. Client places order through WHMCS
2. System automatically creates extension in FusionPBX
3. Secure credentials are generated and distributed
4. Welcome notification is sent to client
5. Service is activated and ready for use

**Billing Workflow:**

Automated billing and usage tracking:

1. Call detail records are collected automatically
2. Usage is calculated based on configured rates
3. Invoices are generated according to billing cycles
4. Payment processing is handled seamlessly
5. Account reconciliation occurs automatically

Email Templates
~~~~~~~~~~~~~~

**Welcome Email Template:**

Configure professional welcome emails that include:

* Service activation confirmation
* Extension and credential details
* Setup instructions and support information
* Branded company information

**Usage Alert Template:**

Set up automated usage notifications:

* Usage threshold alerts
* Billing cycle reminders
* Service upgrade suggestions
* Support contact information

Monitoring and Maintenance
-------------------------

Health Checks
~~~~~~~~~~~~

**API Health Monitoring:**

Implement automated health checks for your FusionPBX API endpoints:

* Monitor API response times and availability
* Check authentication and authorization
* Verify database connectivity
* Alert on service failures

**Database Health Monitoring:**

Regular database health checks should include:

* Connection availability testing
* Query performance monitoring
* Disk space and resource usage
* Backup verification

Log Monitoring
~~~~~~~~~~~~~

**API Log Monitoring:**

Monitor API access and error logs for:

* Authentication attempts and failures
* API usage patterns and trends
* Error rate monitoring
* Performance bottlenecks

**System Log Monitoring:**

Track system-level logs including:

* Web server access and error logs
* PHP error and warning logs
* FreeSWITCH operational logs
* CDR processing logs

Backup Configuration
~~~~~~~~~~~~~~~~~~~

**Automated Backup Strategy:**

Implement comprehensive backup procedures:

* Database backups with point-in-time recovery
* Configuration file backups
* Web application file backups
* Regular backup testing and verification

**Backup Retention:**

Configure appropriate backup retention policies:

* Daily backups for recent data
* Weekly backups for medium-term retention
* Monthly backups for long-term archival
* Automated cleanup of expired backups

Security Configuration
---------------------

SSL/TLS Setup
~~~~~~~~~~~~~

**Certificate Management:**

Implement proper SSL/TLS certificate management:

* Use trusted certificate authorities
* Configure automatic certificate renewal
* Monitor certificate expiration dates
* Implement proper certificate validation

**Security Headers:**

Configure web server security headers:

* Content Security Policy (CSP)
* X-Frame-Options for clickjacking protection
* X-Content-Type-Options for MIME sniffing protection
* X-XSS-Protection for cross-site scripting protection

Firewall Configuration
~~~~~~~~~~~~~~~~~~~~~~

**Network Security:**

Implement proper firewall rules for:

* SSH access control
* Web server port management
* SIP traffic filtering
* Database access restrictions

**Access Control:**

Configure access controls for:

* API endpoint protection
* Database connection restrictions
* Administrative interface security
* File system permissions

Next Steps
----------

After configuration:

1. **Test All Integrations** - Verify WHMCS and API connectivity
2. **Set Up Monitoring** - Configure health checks and alerts
3. **Create Documentation** - Document custom configurations
4. **Train Staff** - Provide training on new features
5. **Plan Maintenance** - Schedule regular maintenance tasks

For API endpoint details, see the :doc:`api_endpoints` guide. 