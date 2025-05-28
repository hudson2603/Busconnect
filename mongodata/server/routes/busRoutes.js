// mongodata/server/routes/busRoutes.js
const express = require('express');
const Bus = require('../models/Bus');  // Import the Bus model
const router = express.Router();

router.get('/buses', async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    console.error("Error fetching buses:", error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
