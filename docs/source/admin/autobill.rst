***************
Autobill CRON
***************

To be able to bill VoIP CDRs from your server module we use a script called autobill. This script should be assigned to execute 30min before your WHMCS daily CRON job. For instance, if your WHMCS Daily CRON is set to run at 1AM the set the CRON for autobill to run at 12:30AM.

Your CRON entry could be as follows:

::

 30 	00 	* 	* 	*  https://www.mywhmcsserver.com/modules/servers/fusionpbx/autobill.php?runfrom=cron
 
|

You may also test run your install by populating the script link into your browser. Be sure to set the next due date of the client's VoIP product to be the current date. 

One method of displaying the calculations from the CDR billing from the autobill script is to enable the check box located within the Providers Mangement dashboard. 
This can be found within the Tariff Management dashboard here:

`Tariff Management <../admin/tariffs.html>`_

