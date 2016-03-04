/* jshint esversion: 6 */


// 1) APN
var apn = require("apn");

// 2) options
const options = {
   keyFile 	: "./key.pem",
   certFile : "./cert.pem"
};

// 3) connection
var connection 	= new apn.Connection(options);

connection.on("connected", function() {
    console.log("config.js - APN-NODE Connected");
});

connection.on("transmitted", function(notification, device) {
    console.log("Notification transmitted to:" + device.token.toString("hex"));
});

// 4) notification
var notification 	= new apn.Notification();


//global variable
module.exports = {
    'secret'				: 'EpamAPNApp', 
    'database'				: 'mongodb://localhost/epam-applewatch-apntests',
    'port'					: "8888", 
    'ip' 					: "http://localhost",

    sendNotification                 : () => {
        connection.sendNotification(notification);
    },

    setNotificationDeviceID			: (newDeviceID) => {
    	notification.device = new apn.Device(`<${newDeviceID}>`);
    },

    setNotificationAlert                        : (alertJSON) => {
        notification.alert = alertJSON;
    },

    setNotificationPayload                     : (payloadDict) => {
        notification.payload = payloadDict;
    },

    setNotificationCategory                     : (categoryString) => {
        notification.category = categoryString; // "SHARE_CATEGORY";
    }
};
