const express = require("express");
const router = express.Router();
const { getSeatsByBusAndDate } = require("../controllers/busController");
const {SeatAvailability} = require("../models/SeatAvailability");
// GET request to fetch seat availability by bus and date
router.get("/seats/byBusDate", getSeatsByBusAndDate);

module.exports = router;
