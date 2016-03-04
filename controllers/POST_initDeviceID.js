/* jslint node: true */

/* jshint esversion: 6 */

"use strict";

const Device 		= require('../models/device');
const config 		= require('../config');

module.exports = function (router) {
	router.post("/initdeviceid", (req, res) => {
		console.log("/POST_initDeviceID.js -  reached");

		Device.findOne({description: "yes"}, function(err, foundDevice) {

		if (err) throw err;
		if (!foundDevice) {
	        //if no device is set, then do nothing
	    	res.json({message:"No default device id used. Please add new or select from existing."});
		}
	      else if (foundDevice) {
	          console.log("FOUND device id: " + foundDevice.device_id);

	          let foundID = foundDevice.device_id;
	          try{
	            config.setNotificationDeviceID(foundID);
	            res.json({ message:foundID });
	          }
	          catch(err) {
	              console.log(`ERROR: ${err}`);
	              res.json({ message : `ERROR: ${err}`});
	          }
	      }
	  }); //Device.findOne

  	console.log("POST_initDeviceID.js - /initDeviceID end");
	});
};
