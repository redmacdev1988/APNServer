# EventsWebApp

Web App for organizing events 
<a href="http://www.rickytsao.com:8881/welcome.html" target="_blank">live demo</a>

<h1>setup instructions</h1>
<h1>Setup</h1>

This project is to be run on a Mac OS X, or Ubuntu.

The backend js files have been used with <a target='_blank' href='https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb'>airbnb eslint</a>, and thus, uses features of ES6. 
Hence, please update to latest version of Node.

<h3>Installation</h3>

Make sure you have Node JS and Mongo DB installed. 

<a href="http://shanghaiseagull.com/index.php/2015/06/09/installing-nodejs-on-mac/" target='_blank'>
To install Node JS
</a>

<a href="http://shanghaiseagull.com/index.php/2015/06/30/install-mongodb-on-mac/">To install Mongo DB</a>


Then copy the repoistory (fork) onto your computer:
git clone https://github.com/redmacdev1988/EventsWebApp.git

You will then see the folder. Look for the "config.js" file. This is where you 
make project configurations.

<h3>configuration</h3>

You will find the configuration file (config.js) in the root directory.

<ul>
<li>secret - This is the string used when we use SHA256 to generate a password during registrations</li>
<li>database - the url of your database</li>
<li>GUNMAIL_API_KEY - We use gunmail service to send emails. This is the API key gunemail web service use to verify that you are a user</li>
<li>port - port # that the app will be listening</li>
<li>ip - the ip address that you want this app to run from</li>
<li>ROOT_PATH - the root path of where you place all of your directory files</li>
<li>EVENT_DEADLINE_WITHIN_HOURS - hours from the deadline to the event itself. </li>
</ul>

<h5>Run it on your local machine</h5>
Make sure your mongodb has the database created already. In our case it would be "BadmintonEventsDatabase"
the ip should be http://localhost
the port can be any valid ports that you decide to use.
Make sure your root path is correct set.
<ul>
<li>'database'	: 'mongodb://localhost/BadmintonEventsDatabase'</li>
<li>'ip'        : "http://localhost"</li>
<li>'port'	: "6688"</li>
<li>'ROOT_PATH' : "/(your directory)/EventsWebApp/"</li>
</ul>

<h5>Run it on live server</h5>
If you are running it on a live server. Same logic applies. Make sure your ip is correct. Also, make sure the root directory is set to reflect the location of where you put this project on your live server.
So for example, say you are trying to run it on an Ubuntu machine, and your ip would be www.myname.com, and the location can be something like: /home/projects/EventsWebApp.

<h3>Layout</h3>

<h5>Server side</h5>
The controllers folder is where all the js files are. These js files contain functions that serve HTTP requests. Each js file serves a certain url, and gives back a response. Those js files are organized in index.js using Express. 

<h5>Models used by Server side</h5>
Our basic and main model is the Event. For Each event, there are basic event information, as well as an array of attendees. Each attendee has basic info such as email. The models are used by the functions that serve HTTP requests in the controller folder. These models are used as containers for data. 

The collection name is set as "badmintonEvents". Hence when you are in mongo's terminal interface, in order to query, you go:

db.badmintonEvents.find()

You can find basic commands to use here:
http://shanghaiseagull.com/index.php/2015/06/30/using-mongo-terminal/

<h5>Client side</h5>
Front end files are located in the public folder. client.js takes care of all the javascript. The .html files uses client.js and contain only HTML.

<h3>Emailing</h3>

We use <a href='https://www.mailgun.com/'>gunmail</a> for emailing.

In order to send an email, we can use curl from the terminal like so:

curl -s --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0' \
    https://api.mailgun.net/v3/samples.mailgun.org/messages \
    -F from='Excited User <excited@samples.mailgun.org>' \
    -F to='devs@mailgun.net' \
    -F subject='Hello' \
    -F text='Testing some Mailgun awesomeness!'

All the email features of this app derives from this example. I registered for the gunmail API, which I use for this app. However, you should create your own account, and use your own gunmail API KEY. After you register, copy and paste the gunmail API KEY into the config.js file.


<h3>Sending reminder email using Crontab</h3>

You can set up a cron job like so. It simply sends a GET HTTP request for the app to send a <b>reminder email</b> for an existing particular event. Keep in mind that server time is in GMT. Hence it is 13 earlier than China time. Thus, in order to send an email on 4pm of every Thursday for Chinese timezone, we must send the email at 3am of every Thursday on GMT.

0 3 * * 4 /(your directory)/BadmintonEventsApp/cron-jobs/send_badminton_reminder >> /(your directory)/BadmintonEventsApp/cron-jobs/cron-log.txt



<h1>For usage instructions</h1>

<h5>Go to the URL of your app</h5>

![](http://shanghaiseagull.com/wp-content/uploads/2016/03/events_1.png)

Give your email for registration instructions


<h5>Check your email</h5>

![](http://shanghaiseagull.com/wp-content/uploads/2016/03/events_2.png)

In order to register, make sure you click on the "click here" link.

<h5>Reminder Email</h5>

Few hours before the event, you will have a Reminder email sent to you.