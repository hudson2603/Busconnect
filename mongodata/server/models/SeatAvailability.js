const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  deck: String,  // "upper" or "lower"
  status: { type: String, default: "available" }, // "available" or "booked"
});

const seatAvailabilitySchema = new mongoose.Schema({
  bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  date: { type: Date, required: true },
  seats: [seatSchema],
});

const SeatAvailability = mongoose.model("SeatAvailability", seatAvailabilitySchema);

module.exports = SeatAvailability;
