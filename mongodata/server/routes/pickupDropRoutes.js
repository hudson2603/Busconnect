const express = require('express'); 
const PickupDrop = require('../models/PickupDrop'); 
const router = express.Router();

// New route to return unique pickup and drop cities
router.get('/locations', async (req, res) => {
  try {
    const pickupCities = await PickupDrop.distinct('pickup');
    const dropCities = await PickupDrop.distinct('drop');
    console.log("Distinct pickup cities:", pickupCities);
    console.log("Distinct drop cities:", dropCities);
    res.json({ pickupCities, dropCities });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route for stops (already present)
router.get('/stops', async (req, res) => {
  try {
    const { pickup, drop } = req.query; // Get query parameters
    if (!pickup || !drop) {
      return res.status(400).json({ message: "Pickup and drop cities are required" });
    }
    const routeData = await PickupDrop.findOne({ pickup, drop });
    if (!routeData) {
      return res.status(404).json({ message: "No stops found for this route" });
    }
    res.json({ stops: routeData.stops });
  } catch (err) {
    console.error("Error fetching stops:", err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
