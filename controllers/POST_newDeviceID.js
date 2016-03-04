/* jslint node: true */

/* jshint esversion: 6 */

"use strict";

const Device 		= require('../models/device');

module.exports = function (router) {
	router.post("/newdeviceid", (req, res) => {


		console.log("POST_newDeviceID.js - /newdeviceid <--");
    	var deviceIdToSave = req.body.deviceid;

    	console.log("debug", "device to save: " + deviceIdToSave);

  		if(deviceIdToSave !== undefined && deviceIdToSave !== null) {
    		// create a new device
    		var newDevice = new Device({
      			device_id: deviceIdToSave,
      			bundle_id: "com.rtsao.localapn",
      			description: 'no'
    		});

        	console.log("new device object created");

    		// call the built-in save method to save to the database
  			newDevice.save(function(err) {
        		console.log("saving device id " + deviceIdToSave);
      			try {
        			if(err) throw err; //if the save has errors, let's throw it
      			}
      			catch(err) {
          			console.log(`error in adding new device: ${err}`);
            		res.send(`Sorry, device with id ${deviceIdToSave} already exists. please try another`);
          			return;
      			}

				console.log(`device ${deviceIdToSave} saved successfully!`);

        		Device.find({}, function(err, devices){
          			try {
            			if(err) throw err;
            			res.type('application/json');
                		console.log("sending list of devices back to client");
            			res.send(devices);
          			}
          			catch(err) {
            			res.send(err);
            			return;
          			}
        		}); // find
    		}); // save
  		} // if valid
		else { //incoming data not valid
    		console.log("server.js - req.body.deviceid is NOT valid.");
  			res.send(`server.js - Device NOT saved....param ${deviceIdToSave} is not valid`);
  		}

  		console.log("/newdeviceid --> ");
	
	});
};
