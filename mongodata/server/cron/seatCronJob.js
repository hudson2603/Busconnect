const cron = require("node-cron");
const SeatAvailability = require("../models/SeatAvailability");
const Bus = require("../models/Bus");
const generateDefaultSeats = require("../utils/seatGenerator");

// Function to initialize seats for the next day
const initializeSeatsForNextDay = async (numDays =30) => {
  try {
     const buses = await Bus.find();// Fetch all bus records

    // Loop from tomorrow to numDays ahead
    for (let i = 1; i <= numDays; i++) {
      const dateToInitialize = new Date();
      dateToInitialize.setDate(dateToInitialize.getDate() + i);
      dateToInitialize.setHours(0, 0, 0, 0); // Normalize to midnight

      for (const bus of buses) {
        // Check if seat availability already exists for this bus on dateToInitialize
        const existingSeats = await SeatAvailability.findOne({
          bus: bus._id,
          date: dateToInitialize
        });

        if (!existingSeats) {
          const seatLayout = generateDefaultSeats();
          await SeatAvailability.create({
            bus: bus._id,
            date: dateToInitialize,
            seats: seatLayout,
          });
          console.log(`Seats initialized for Bus ID: ${bus._id} on ${dateToInitialize}`);
        }
      }
    }
  } catch (error) {
    console.error("Error initializing seats:", error);
  }
};

// Schedule job to run every night at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  console.log("Running seat initialization job for upcoming days...");
  await initializeSeatsForNextDay();
});

module.exports = initializeSeatsForNextDay;
