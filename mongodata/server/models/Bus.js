// mongodata/server/models/Bus.js
const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  busname: { type: String, required: true },
  route: {type:String , required :true},
  dept: { type: String, required: true },       // Departure time or station
  duration: { type: String, required: true },   // Travel duration
  arrival: { type: String, required: true },
  rating: { type: Number, required: true },
  price: { type: Number, required: true }
});

// Explicitly specify the collection name as "buses"
module.exports = mongoose.model('Bus', BusSchema, 'buses');
