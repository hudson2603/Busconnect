const Order = require('../models/Order');
const SeatAvailability = require('../models/SeatAvailability');

exports.chargePayment = async (req, res) => {
  const {
    busId,
    selectedSeats,
    passengers,
    contact,
    foodOrder,
    paymentDetails,
    totalAmount,
    exactDate // Expected as YYYY-MM-DD string
  } = req.body;

  try {
    // Convert exactDate into a Date range (start and end of the day)
    const travelDate = new Date(exactDate);
    travelDate.setHours(0, 0, 0, 0);
    const endOfDay = new Date(travelDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Find the seat availability document for this bus on that day
    const seatData = await SeatAvailability.findOne({
      bus: busId,
      date: { $gte: travelDate, $lte: endOfDay }
    });
    if (!seatData) {
      return res.status(404).json({ message: "Seat availability not found for the given date" });
    }

    // Mark selected seats as booked (only if currently available)
    seatData.seats = seatData.seats.map(seat => {
      if (selectedSeats.includes(seat.seatNumber) && seat.status === "available") {
        seat.status = "booked";
      }
      return seat;
    });
    await seatData.save();


    // Create an order document.
    const order = new Order({
      userId: req.userId,
      bus: busId,
      seats: selectedSeats,
      passengers,
      contact,
      foodOrder,
      exactDate:travelDate,
      payment: { ...paymentDetails, method: paymentDetails.method },
      totalAmount
    });
    await order.save();

    res.status(201).json({ message: "Payment processed and booking confirmed", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
