// routes/profileRoutes.js
const { startOfDay } = require('date-fns');
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware"); // See note below

// GET orders for the current user
router.get("/profile/orders", authMiddleware, async (req, res) => {
  try {
    // Get today's date and set time to midnight for consistent comparison
    const today = startOfDay(new Date());
    console.log("Today (local, normalized):", today);;


    // Fetch current bookings (orders with exactDate today or in the future)
    const currentBookings = await Order.find({
      userId: req.userId,
      exactDate: { $gte: today }
    }).sort({ exactDate: 1 });

    // Fetch previous journeys (orders with exactDate before today)
    const previousJourneys = await Order.find({
      userId: req.userId,
      exactDate: { $lt: today }
    }).sort({ exactDate: -1 });

    res.json({ currentBookings, previousJourneys });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
