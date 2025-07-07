FusionPBX Troubleshooting Guide
==============================

Overview
--------

This guide provides comprehensive troubleshooting information for FusionPBX integration issues. It covers common problems, diagnostic procedures, and solutions for system administration and maintenance.

Common Issues and Solutions
---------------------------

Authentication Failures
~~~~~~~~~~~~~~~~~~~~~~

**Symptoms:**

* 401 Unauthorized errors
* "Invalid credentials" responses
* Authentication endpoint failures

**Diagnostic Steps:**

.. code-block:: bash

    # Test system authentication
    curl -X POST https://your-fusionpbx.com/core/authentication/resources/authenticate.php \
      -d "username=admin&password=your-password"

    # Check user account status
    sudo -u postgres psql fusionpbx -c "
    SELECT username, user_enabled, user_status 
    FROM v_users 
    WHERE username = 'admin';"

**Solutions:**

* Reset administrator password through the web interface
* Verify user account is enabled and active
* Check password complexity requirements
* Clear browser cache and cookies

API Endpoint Issues
~~~~~~~~~~~~~~~~~~

**Symptoms:**

* 404 Not Found errors
* "Endpoint not found" messages
* Missing API functionality

**Diagnostic Steps:**

.. code-block:: bash

    # Verify API file existence
    ls -la /var/www/fusionpbx/app/status/index.php
    ls -la /var/www/fusionpbx/app/registrations/check_registration.php

    # Check file permissions
    find /var/www/fusionpbx/app/ -name "*.php" -exec ls -la {} \;

    # Test web server configuration
    sudo nginx -t
    sudo apache2ctl configtest

**Solutions:**

* Reinstall API files from backup
* Set correct file permissions (644 for files, 755 for directories)
* Verify web server configuration
* Check URL rewriting rules

Database Connection Problems
~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Symptoms:**

* Database connection errors
* "Unable to connect to database" messages
* Database-related API failures

**Diagnostic Steps:**

.. code-block:: bash

    # Test database connectivity
    sudo -u postgres psql fusionpbx -c "SELECT 1;"

    # Check database service status
    sudo systemctl status postgresql

    # Review database logs
    sudo tail -f /var/log/postgresql/postgresql-*.log

    # Verify database exists
    sudo -u postgres psql -c "\l" | grep fusionpbx

**Solutions:**

* Restart PostgreSQL service
* Verify database credentials in configuration
* Check database existence and accessibility
* Monitor disk space and memory usage

Theme and Interface Issues
~~~~~~~~~~~~~~~~~~~~~~~~~

**Symptoms:**

* Default theme displayed instead of custom theme
* Custom branding not appearing
* Login page using default template

**Diagnostic Steps:**

.. code-block:: bash

    # Check theme file existence
    ls -la /var/www/fusionpbx/themes/default/
    ls -la /var/www/fusionpbx/core/authentication/resources/views/

    # Verify database theme settings
    sudo -u postgres psql fusionpbx -c "
    SELECT default_setting_name, default_setting_value, default_setting_enabled 
    FROM v_default_settings 
    WHERE default_setting_name = 'login_template';"

    # Check file permissions
    ls -la /var/www/fusionpbx/themes/default/images/

**Solutions:**

* Reinstall theme files from backup
* Correct file permissions
* Clear browser cache and cookies
* Restart web server services
* Verify database configuration settings

FreeSWITCH Communication Problems
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Symptoms:**

* Registration status checks failing
* "FreeSWITCH not responding" errors
* Gateway status unavailable

**Diagnostic Steps:**

.. code-block:: bash

    # Check FreeSWITCH service status
    sudo systemctl status freeswitch

    # Test FreeSWITCH CLI connectivity
    fs_cli -x "version"

    # Monitor FreeSWITCH logs
    sudo tail -f /var/log/freeswitch/freeswitch.log

    # Check SIP profile status
    fs_cli -x "sofia status"

**Solutions:**

* Restart FreeSWITCH service
* Verify FreeSWITCH configuration files
* Check SIP profile settings
* Test network connectivity

CDR Data Collection Issues
~~~~~~~~~~~~~~~~~~~~~~~~~

**Symptoms:**

* No call detail records available
* CDR export returning empty results
* Missing call history data

**Diagnostic Steps:**

.. code-block:: bash

    # Check CDR table records
    sudo -u postgres psql fusionpbx -c "
    SELECT COUNT(*) FROM v_xml_cdr;"

    # Review recent CDR entries
    sudo -u postgres psql fusionpbx -c "
    SELECT start_stamp, caller_id_number, destination_number 
    FROM v_xml_cdr 
    ORDER BY start_stamp DESC 
    LIMIT 10;"

    # Verify CDR module status
    fs_cli -x "xml_cdr status"

**Solutions:**

* Enable CDR logging in FreeSWITCH configuration
* Verify CDR module is loaded and configured
* Check database table structure
* Restart FreeSWITCH service

Diagnostic Tools
----------------

System Health Check Script
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

    #!/bin/bash
    # fusionpbx_health_check.sh
    
    echo "=== FusionPBX System Health Check ==="
    echo "Timestamp: $(date)"
    echo
    
    # Check services
    echo "Service Status:"
    systemctl is-active --quiet freeswitch && echo "✓ FreeSWITCH: Running" || echo "✗ FreeSWITCH: Stopped"
    systemctl is-active --quiet postgresql && echo "✓ PostgreSQL: Running" || echo "✗ PostgreSQL: Stopped"
    systemctl is-active --quiet nginx && echo "✓ nginx: Running" || echo "✗ nginx: Stopped"
    echo
    
    # Check disk space
    echo "Disk Usage:"
    df -h /var/www/fusionpbx
    echo
    
    # Check memory usage
    echo "Memory Usage:"
    free -h
    echo
    
    # Test database connection
    echo "Database Connection:"
    sudo -u postgres psql fusionpbx -c "SELECT 1;" 2>/dev/null && echo "✓ Database: Connected" || echo "✗ Database: Connection Failed"
    echo
    
    # Check API endpoints
    echo "API Endpoint Status:"
    curl -s -o /dev/null -w "%{http_code}" https://your-fusionpbx.com/app/status/index.php | grep -q "200" && echo "✓ Status API: Accessible" || echo "✗ Status API: Not Accessible"

Log Analysis
------------

System Logs
~~~~~~~~~~

**Web Server Logs:**

.. code-block:: bash

    # nginx access logs
    sudo tail -f /var/log/nginx/access.log | grep fusionpbx
    
    # nginx error logs
    sudo tail -f /var/log/nginx/error.log
    
    # Apache access logs (if using Apache)
    sudo tail -f /var/log/apache2/access.log | grep fusionpbx

**Application Logs:**

.. code-block:: bash

    # PHP error logs
    sudo tail -f /var/log/php_errors.log
    
    # FusionPBX application logs
    sudo tail -f /var/log/fusionpbx/app.log

**Database Logs:**

.. code-block:: bash

    # PostgreSQL logs
    sudo tail -f /var/log/postgresql/postgresql-*.log
    
    # Database connection logs
    sudo tail -f /var/log/postgresql/postgresql-*.log | grep -i "connection"

**FreeSWITCH Logs:**

.. code-block:: bash

    # FreeSWITCH main log
    sudo tail -f /var/log/freeswitch/freeswitch.log
    
    # FreeSWITCH error log
    sudo tail -f /var/log/freeswitch/freeswitch.log | grep -i "error"
    
    # CDR processing logs
    sudo tail -f /var/log/freeswitch/xml_cdr.log

Performance Monitoring
---------------------

System Resources
~~~~~~~~~~~~~~~

**CPU and Memory Monitoring:**

.. code-block:: bash

    # Real-time system monitoring
    htop
    
    # CPU usage over time
    sar -u 1 10
    
    # Memory usage
    free -h && vmstat 1 5

**Disk I/O Monitoring:**

.. code-block:: bash

    # Disk usage
    df -h
    
    # I/O statistics
    iostat -x 1 5
    
    # Disk activity
    iotop

**Network Monitoring:**

.. code-block:: bash

    # Network connections
    netstat -tuln
    
    # Network traffic
    iftop
    
    # Bandwidth usage
    nethogs

Database Performance
~~~~~~~~~~~~~~~~~~~

**Query Performance:**

.. code-block:: bash

    # Check slow queries
    sudo -u postgres psql fusionpbx -c "
    SELECT query, mean_time, calls 
    FROM pg_stat_statements 
    ORDER BY mean_time DESC 
    LIMIT 10;"

**Database Statistics:**

.. code-block:: bash

    # Table sizes
    sudo -u postgres psql fusionpbx -c "
    SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
    FROM pg_tables 
    WHERE schemaname = 'public' 
    ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"

**Connection Monitoring:**

.. code-block:: bash

    # Active connections
    sudo -u postgres psql fusionpbx -c "
    SELECT count(*) as active_connections 
    FROM pg_stat_activity 
    WHERE state = 'active';"

Preventive Maintenance
---------------------

Regular Maintenance Tasks
~~~~~~~~~~~~~~~~~~~~~~~~

**Daily Tasks:**

* Monitor system logs for errors
* Check service status
* Verify disk space availability
* Review API endpoint accessibility

**Weekly Tasks:**

* Analyze performance metrics
* Review database statistics
* Check backup integrity
* Update security patches

**Monthly Tasks:**

* Comprehensive system health check
* Performance optimization review
* Security audit
* Configuration backup

Backup and Recovery
~~~~~~~~~~~~~~~~~~

**Database Backup:**

.. code-block:: bash

    # Create database backup
    sudo -u postgres pg_dump fusionpbx > /backup/fusionpbx_$(date +%Y%m%d).sql
    
    # Backup with compression
    sudo -u postgres pg_dump fusionpbx | gzip > /backup/fusionpbx_$(date +%Y%m%d).sql.gz

**Configuration Backup:**

.. code-block:: bash

    # Backup FreeSWITCH configuration
    tar -czf /backup/freeswitch_config_$(date +%Y%m%d).tar.gz /etc/freeswitch/
    
    # Backup web application files
    tar -czf /backup/fusionpbx_web_$(date +%Y%m%d).tar.gz /var/www/fusionpbx/

**Recovery Procedures:**

.. code-block:: bash

    # Restore database
    sudo -u postgres psql fusionpbx < /backup/fusionpbx_20240115.sql
    
    # Restore configuration
    tar -xzf /backup/freeswitch_config_20240115.tar.gz -C /

Security Considerations
----------------------

Access Control
~~~~~~~~~~~~~

**User Management:**

* Regularly review user accounts
* Remove inactive users
* Implement strong password policies
* Use role-based access control

**Network Security:**

* Configure firewall rules
* Implement IP whitelisting
* Use VPN for remote access
* Monitor network traffic

**Application Security:**

* Keep software updated
* Use HTTPS for all communications
* Implement rate limiting
* Regular security audits

Monitoring and Alerting
~~~~~~~~~~~~~~~~~~~~~~

**System Monitoring:**

* Set up automated health checks
* Configure performance alerts
* Monitor resource usage
* Track API response times

**Security Monitoring:**

* Monitor authentication attempts
* Track API access patterns
* Alert on suspicious activity
* Log security events

**Backup Monitoring:**

* Verify backup completion
* Test backup restoration
* Monitor backup storage
* Alert on backup failures 