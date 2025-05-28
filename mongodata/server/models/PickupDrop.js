const mongoose = require('mongoose');

const PickupDropSchema = new mongoose.Schema({
  pickup: { type: String, required: true },
  drop: { type: String, required: true },
  stops: {type:[String] ,required:true}
});

// Use 'pickupdrop' as the collection name explicitly
module.exports = mongoose.model('PickupDrop', PickupDropSchema, 'pickupdrop');

