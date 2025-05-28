// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bus: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  selectedSeats: [String],
  passengers: [
    {
      name: String,
      age: Number,
      gender: String,
      seatNumber: String
    }
  ],
  contact: {
    phone: String,
    email: String
  },
  foodOrder: { type: Object }, // You can further define schema for food order
  paymentDetails: { type: Object },
  totalAmount: Number,
  exactDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
