// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var deviceSchema = new Schema({
  device_id: String,
  bundle_id: String,
  description: String
}, { collection: 'deviceCollection'});

//the collection means the custom name of the collection you want to appear in
// your mongo database. Hence you would do something like db.deviceCollection.find()
//to see all entries of your 'device id' collection.


// the schema is useless so far
// we need to create a model using it
var Device = mongoose.model('devices', deviceSchema);

// make this available in our Node applications
module.exports = Device;
