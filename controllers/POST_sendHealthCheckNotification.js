/* jslint node: true */

/* jshint esversion: 6 */

"use strict";

const Device 		= require('../models/device');
const config		= require('../config');

module.exports = function (router) {
	router.post("/sendhealthchecknotification", (req, res) => {	
		console.log("POST_sendHealthCheckNotification.js - /sendhealthchecknotification <---");
	    const alertJSON = {
	      "title":  "Health Check",
	      "body":   "You have 7 new Portfolio Health Check(s) on your UBS Advice portfolio ****81 Log into UBS Wealth Management for details."
	    };

		const payLoadDict = {
			"parameters" : "[{'type':'healthcheck','issues':'3','asof':2015-12-1 21:17:30.802}]"
	    };

		console.log("debug", "server.js - SENDING notification packet....");

	    const payloadString = payLoadDict.parameters;
	    const alertLength 	= alertJSON.body.length + alertJSON.title.length;
	    const totalLength 	= alertLength + payloadString.length;
	    console.log("debug", totalLength + " bytes < 2k ? ");

	    config.setNotificationAlert(alertJSON);
	    config.setNotificationPayload(payLoadDict);
	    config.setNotificationCategory("SHARE_CATEGORY");
	    config.sendNotification();

	    res.send(`server.js - notification of length ${totalLength} sent`);
		console.log("info", "server.js - /sendHealthCheckNotification --->");
	});
};
