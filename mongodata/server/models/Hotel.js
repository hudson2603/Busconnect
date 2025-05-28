// models/Hotel.js
const mongoose = require("mongoose");

const FoodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const HotelSchema = new mongoose.Schema({
  stop: { type: String, required: true },  // This is the stop name (e.g., "Bangalore")
  hotelName: { type: String, required: true },
  address: { type: String },
  foodItems: { type: [FoodItemSchema], default: [] }
});

// Explicitly specify collection name if needed, e.g., 'hotels'
module.exports = mongoose.model("Hotel", HotelSchema, "hotels");
