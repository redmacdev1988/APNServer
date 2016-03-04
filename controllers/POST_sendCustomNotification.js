/* jslint node: true */

/* jshint esversion: 6 */

"use strict";

const Device 		= require('../models/device');
const config		= require('../config');

module.exports = function (router) {
	router.post("/sendcustomnotification", (req, res) => {	
		console.log("POST_sendCustomNotification.js - /sendcustomnotification <---");

	    var alertJSON   = JSON.parse(req.body.customAlert);
	    var payloadJSON = JSON.parse(req.body.customPayload);

	    var totalLength = req.body.customAlert.length + req.body.customPayload.length;
	    console.log(`Total number of bytes: (not to exceed 1,900 bytes): ${totalLength}`);

	    //apply alert and payload data to existing notification variable
	    config.setNotificationAlert(alertJSON);
	    config.setNotificationPayload(payloadJSON);

		try {
			config.sendNotification();
		}
		catch(err) {
			res.send(`POST_sendCustomNotification.js - error: ${err}`);
		}
		finally {
			res.send(`POST_sendCustomNotification.js - notification of length ${totalLength} sent`);
		}

	    console.log("------- server.js - END /sendCustomNotification --->");

	});
};
