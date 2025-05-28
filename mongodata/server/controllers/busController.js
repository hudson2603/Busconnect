const SeatAvailability = require("../models/SeatAvailability");
const Bus = require("../models/Bus");

// In your controllers/busController.js for getSeatsByBusAndDate:
const getSeatsByBusAndDate = async (req, res) => {
  const { busId, date } = req.query;
  if (!busId || !date) {
    return res.status(400).json({ message: "Bus ID and Date are required" });
  }
  try {
    const travelDate = new Date(date);
    if (isNaN(travelDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    // Create start and end of day
    const startOfDay = new Date(travelDate);  
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(travelDate);
    endOfDay.setHours(23, 59, 59, 999);

    const seatData = await SeatAvailability.findOne({ bus: busId, date: startOfDay });
    if (!seatData) {
      return res.status(404).json({ message: "No seat availability found for this bus on the selected date" });
    }
    res.json(seatData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getSeatsByBusAndDate };
