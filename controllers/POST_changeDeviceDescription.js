/* jslint node: true */

/* jshint esversion: 6 */

"use strict";

const Device 		= require("../models/device");
const config 		= require("../config");


function setDeviceDescriptionToYes (device, deviceIDToUse, responseObject) {
	console.log("entered setDeviceDescriptionToYes");

	device.description = "yes";
	console.log("description set to yes");
	device.save((err) => {
		console.log("device yes");
    	if (err) {
    		console.log("ERROR!!!");
      		responseObject.json({message:err});
      	}
    	else {
        	try {
        		console.log(`POST_changeDeviceDescription.js ${deviceIDToUse} set for use!`);
            	// since we have set our device to USE, we set the device id
           		config.setNotificationDeviceID(deviceIDToUse);
            	//res.json({message:deviceIDToUse});
            	responseObject.json({message:deviceIDToUse});
          	}
          	catch(err) {
				console.log(`POST_changeDeviceDescription.js - ERROR: ${err}`);
				//res.json({message:"ERROR: " + err});
				responseObject.json({message:"ERROR: " + err});
			}
    	}
	}); // foundDevice save
}


module.exports = function (router) {
	router.post("/changedevicedescription", (req, res) => {
		console.log("fri 11:07 POST_changeDeviceDescription - /changedevicedescription");

		const deviceIDToUse = req.body.deviceid;
  		console.log(`POST_changeDeviceDescription.js - let's turn | ${deviceIDToUse} | (on)`);


  		// STEP 1 - find device(s) that has description 'yes' and set it to 'no'
  		// this is so that 
		Device.find({ description: "yes" }, function(err, devices) {

			if (devices!==undefined) {
	      		for( var i = 0; i < devices.length; i++) {
					devices[i].description = "no";
					devices[i].save(function(err) {
			        	if(err) {
			        	} else {
			        		console.log("devices all set to 'no'");
			        	}
			        });
				} 
				console.log("POST_changeDeviceDescription.js - resetting all devices to no.");
	    	} 
		}); //Device.find


		//find this particular and set it to yes
		// STEP 2 - let's find this device id
  		Device.findOne({device_id: deviceIDToUse}, function(err, foundDevice) {
  			console.log("found device id to use: " + deviceIDToUse);
        	if (err) throw err;
        	if (!foundDevice){
        		console.log("device to use not found. returning error");
				res.json({ success: false, message: 'Device not found.' });
        	}
        	else if (foundDevice) {
            	console.log(`POST_changeDeviceDescription.js - device id ${deviceIDToUse} found!`);
            	setDeviceDescriptionToYes(foundDevice, deviceIDToUse, res);
            	
        	} // if/else
    	}); // findOne



	}); //post 
};
