***************
Autobill CRON
***************

To be able to bill VoIP CDRs from your server module we use a script called Autobill. This script should be assigned to execute before your WHMCS daily CRON job. For instance, if your WHMCS Daily CRON is set to run at 1AM then set the CRON for Autobill to run at 12:55AM. This should allow enough time if you have many servers and domains/tenants for each server module. If you find this is not enough time then move your daily CRON in WHMCS to 2AM and your Autobill CRON at 12:45AM

Your CRON entry could be as follows:
*(replace MYMODULE with the server module you have installed)*
::

 55 	00 	* 	* 	*  https://www.mywhmcsserver.com/modules/servers/MYMODULE/autobill.php?runfrom=cron
 
|

You may also test run your install by populating the script link into your browser. Be sure to set the next due date of the client's VoIP product to be the current date. Running the Autobill script does not increment the products next billing date as this is done throught the WHMCS daily CRON at which time if your product is set to monthly with Generate the monthly invoice after the Autobill and change to the next due date.

One method of displaying the calculations from the CDR billing from the Autobill script is to enable the check box located within the Providers Mangement dashboard. 
This can be found within the Tariff Management dashboard here: `Tariff Management <../admin/tariffs.html>`_
You would then run a manual autobill run by executing https://www.mywhmcsserver.com/modules/servers/MYMODULE/autobill.php.

