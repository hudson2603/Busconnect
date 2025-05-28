require('dotenv').config();  //Load .env variables
const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); //Import DB connection
const initializeSeatsForNextDay = require("./cron/seatCronJob");


const app = express();
app.use(express.json());
app.use(cors());  // Ensure CORS is enabled

// Connect to MongoDB
connectDB();
// routing seats
const seatRoutes = require('./routes/seatRoutes');  
app.use('/api', seatRoutes);

// Import and use pickup/drop routes
const pickupDropRoutes = require('./routes/pickupDropRoutes');
app.use('/api', pickupDropRoutes); // Now available at `/api/locations`

// Import and use bus routes
const busRoutes = require('./routes/busRoutes');
app.use('/api', busRoutes);

//For user 
const authRoutes = require("./routes/auth"); // Import first
app.use("/api/auth", authRoutes);

// Hotel routes
const hotelRoutes = require("./routes/hotelRoutes");
app.use("/api", hotelRoutes);

// New payment routes
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api', paymentRoutes);

// New profile routes
const profileRoutes = require('./routes/profileRoutes');
app.use('/api', profileRoutes);

// live tracking Routes
const liveTrackingRoutes = require("./routes/liveTrackingRoutes");
app.use("/api", liveTrackingRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
// For refreshing next day seats
initializeSeatsForNextDay();