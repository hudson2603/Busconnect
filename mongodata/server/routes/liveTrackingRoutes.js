// routes/liveTrackingRoutes.js
const express = require("express");
const router = express.Router();

// Example: Dummy data for live tracking
// In a real application, replace this with your logic to get the actual bus location
router.get("/bus/location/:busId", (req, res) => {
  const { busId } = req.params;
  // For demonstration, we return fixed coordinates.
  // Replace the following with actual tracking data from your source.
  res.json({
    busId,
    latitude: 12.9716,   // example latitude
    longitude: 77.5946   // example longitude
  });
});

module.exports = router;
