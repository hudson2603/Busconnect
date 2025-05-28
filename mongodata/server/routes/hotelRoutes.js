// routes/hotelRoutes.js
const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

// GET hotels by stop name
router.get("/hotels", async (req, res) => {
  try {
    const { stop } = req.query;
    if (!stop) {
      return res.status(400).json({ message: "Stop is required" });
    }
    const hotels = await Hotel.find({ stop });
    res.json({ hotels });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
