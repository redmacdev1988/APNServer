/* jslint node: true */

/* jshint esversion: 6 */

"use strict";

const Device 		= require('../models/device');

module.exports = function (router) {
	router.post("/initdevicelist", (req, res) => {
		
		//find all devices
		Device.find({}, function(err, devices){
			try {
				console.log("found " + devices.length + " devices");
  				if(err) throw err;
  				res.type("application/json");
  				res.send(devices); // returns array of lists
  				return;
			}
			catch(err) {
  				res.send(err);
  				return;
			}
		}); //find All

  		console.log("POST_initdevicelist.js - /initdevicelist end");
	});
};
