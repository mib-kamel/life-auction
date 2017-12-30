Instructions to install and configure prerequisites or dependencies
====================================================================
Please install the nodeJS last stable version and MySQL server
Enter the database host and user and password in the file => /config/connections.js


Instructions to create and initialize the database
===================================================
Run the SQL query which inside the file "life_auction.sql".

Requirements that i have not covered in your submission
=======================================================
* If this same user is considered to be currently logged 
in at another browser or tab, it must be immediately logged out from that other instance.

* When an auction reaches its end (no time left), the results (winning bid and the name of the user 
who placed it) are shown for a while (10 seconds), before a new auction is allowed to begin.

Instructions to configure and prepare the source code to build and run properly
================================================================================
Open the CMD and direct to the code path
type "npm i"
If the last stable nodejs version is installed and the mysql is installed you can run "sails lift".

Instructions to prepare and run the test suites
================================================
To run the backend integration tests just run "npm test" inside the code root folder

To run the angular components tests you should enter to the forend folder and type "npm i",
 install the @angular/cli globally then run "npm test" inside the forend folder.