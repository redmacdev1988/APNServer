/* jslint node: true */

/* jshint esversion: 6 */

"use strict";

const Device 		= require('../models/device');

module.exports = function (router) {
	router.post("/getselecteddeviceid", (req, res) => {
		console.log( "POST_getSelectedDeviceID.js /getSelectedDeviceId <-- ");

		  //STEP 1 - get all device ids that have description as true.
		  Device.findOne({description: "yes"}, function(err, foundDevice) {
		      console.log(`|${foundDevice}|`);

		    if (foundDevice !== undefined && foundDevice !== null) {
		    	console.log(`POST_getSelectedDeviceID.js - FOUND devices with description of yes: ${foundDevice.device_id}`);

		      	let deviceId 			= foundDevice.device_id;
		      	let nospaces_deviceId 	= deviceId.replace(/ /g, '');

		      	console.log(`POST_getSelectedDeviceID.js - no spaces device id: ${nospaces_deviceId}`);

		      	res.json({ success: true, device_id: nospaces_deviceId });
		    } else {
		        console.log("POST_getSelectedDeviceID - User have not made device id selection.");
		        res.json({ success: false, device_id: 0 });
		    }
		  }); //Device.findOne

		  console.log("POST_getSelectedDeviceID.js - /getSelectedDeviceId --> ");
	});
};
