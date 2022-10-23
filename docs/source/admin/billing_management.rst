****************************
Billing Management Details
****************************

The main dashboard of the ictVoIP Billing Management Dashboard includes several areas which we will cover here. 

Tariff/Rates
***************


Tariff Importing
##################

Relevant information can be found here on how to and mapping:  `Tariffs <../admin/tariffs.html>`_


Tariff Exporting
##################

By highlighting the imported Tariff name you may export the Tariff to CSV for updating or inspection.

.. warning:: If reimporting your exported Tariff do not include the "status" column


Package Rates
***************

Relevant information can be found here on how to manage your VoIP packages:  `Package Rates <../admin/packages.html>`_


Autobill Debug
****************

When you enable CDR Autobill Debug you will be presented with an output of the CDR billing collection from manually running the autobill.  You may test run your install by populating the script link into your browser. Be sure to set the next due date of the client’s VoIP product to be the current date.

When executed debug will display the calculations from the CDR billing once it has complete. 

.. Warning ::  Note that when running CRON via the browser it's processing can be very slow, be patient.

Further information on Autobill CRON can be found here: `Autobill CRON <../admin/packages.html>`_

|

 .. image:: ../_static/images/admin/enable_debug.png
        :scale: 70%
        :align: center
        :alt: Adding a new Provider or PBX
        
|


Filtering
***********

Here we can filter CDR information for a particular Provider. When selecting the provider from the ictVoIP Billing Dashboard you are presented with the Billing Management Dashboard. 

Exclude/Suppress
##################


Exclude from Billing
#######################



