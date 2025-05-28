import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import HotelList from './HotelList';
import PaymentGateway from './PaymentGateway';

function Payment() {
  // Retrieve data passed via route state (from PassengerDetails)
  const location = useLocation();
  const { ShowPrice = 0, stops ,pickupcity ,dropcity 
    ,duration,exactdate , countseats ,selectedSeats,selectedbus
    ,price,passengers,contact ,formattedDate ,departure} = location.state || {};
  // states for Food-hotel-offer-payment
  const [paymentMethod, setPaymentMethod] = useState("");
  const [offerCode, setOfferCode] = useState("");
  const [showHotelList, setShowHotelList] = useState(false);
  const [foodOrderData ,setFoodOrderData] = useState(null);
  const [showGateway, setShowGateway] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
const navigate = useNavigate();
const formattedExactDate = new Date(exactdate).toISOString().split('T')[0];

 const processPayment = (finalOrder) => {
  console.log("final order ", finalOrder);  
  // Call your backend API endpoint with finalOrder details
    fetch("http://localhost:5000/api/payment/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalOrder)
    })
      .then((response) => {
        if (!response.ok) throw new Error("Payment failed");
        return response.json();
      })
      .then((data) => {
        // On success, navigate to the ticket view page
        navigate("/Ticket", { state: { 
          order: data.order,
          pickupcity: pickupcity ,
          dropcity: dropcity ,
          duration:duration ,
          exactdate:formattedExactDate , 
          countseats :countseats, 
          selectedSeats:selectedSeats,
          selectedbus:selectedbus,
          departure:departure
          
        } });
      })
      .catch((err) => {
        alert("Payment processing error: " + err.message);
      });
  };

  const handlePayment = () => {
    if(!paymentMethod){
      alert("Please select the payment method!!");
      return;
    }
    
    if (paymentMethod === "Credit Card" || paymentMethod === "Debit Card") {
      setShowGateway(true);
    }
    else {
      // For QR Code or UPI, simulate immediate processing:
      processPayment({
        busId: selectedbus._id, // Adjust as necessary
        selectedSeats,
        passengers,
        contact,
        foodOrder: foodOrderData,
        paymentDetails: { method: paymentMethod },
        totalAmount: ShowPrice,
        exactDate: formattedExactDate,
        offerCode
      });
    }
  };

    const handleFoodOrderConfirm = (order) => {
    // Combine ticket price and food total
    const finalPrice = ShowPrice + order.foodTotal;
    setFoodOrderData({ ...order, finalPrice });
    console.log("Final Payment Amount:", finalPrice);
    setShowHotelList(false)
  };
  const handleGatewayConfirm = (details) => {
    setPaymentDetails(details);
    setShowGateway(false);
    // Combine order data and process payment
    processPayment({
      busId: selectedbus._id,
      selectedSeats,
      passengers,
      contact,
      foodOrder: foodOrderData,
      paymentDetails: details,
      totalAmount: ShowPrice,
      exactDate: formattedExactDate,
      offerCode
    });
  };

  return (
    <div>
      <div className="header bg-red-500 w-full mt-24 text-white text-center p-2">
        <h2>Chennai ➝ Coimbatore</h2>
      </div>
      <div className="flex flex-wrap">
        {/* Payment Section */}
        <div className="w-full md:w-2/3 p-4">
          <div>
            <p>Now ,You Order Food at your Stop {stops}</p>
          <button 
              onClick={() => setShowHotelList(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              See Hotels & Food Options
            </button>
          </div>
          
          <div className="offer-code p-4">
            <label className="block font-medium">Have a coupon code?</label>
            <input
              type="text"
              placeholder="ENTER OFFER CODE"
              value={offerCode}
              onChange={(e) => setOfferCode(e.target.value)}
              className="border p-2 w-full rounded"
            />
          </div>

          <div className="payment-methods p-4">
            <h3 className="font-bold">Choose Payment Method</h3>
            <div className="border p-3 mt-2">
              <label className="block">
                <input
                  type="radio"
                  name="payment"
                  value="QR Code"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Pay through QR code 🇮🇳
              </label>
              <label className="block mt-2">
                <input
                  type="radio"
                  name="payment"
                  value="UPI ID"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Pay through UPI ID 🇮🇳
              </label>
            </div>
            <div className="border p-3 mt-2">
              <label className="block">
                <input
                  type="radio"
                  name="payment"
                  value="Credit Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Credit Card 💳
              </label>
              <label className="block mt-2">
                <input
                  type="radio"
                  name="payment"
                  value="Debit Card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />{" "}
                Debit Card 💳
              </label>
            </div>
          </div>
        </div>
        {/* Bus & Passenger Details Section */}
        <div className="w-full md:w-1/3 p-4">
          <div className="bus-details p-4 border rounded-lg shadow-lg bg-white">
            <h3 className="text-red-500 font-bold text-2xl mb-4">{selectedbus.busName}</h3>
            <div className="mb-4">
            <p className="text-gray-700 text-base">
                <span role="img" aria-label="calendar">🗓</span> Departure: {pickupcity} - {duration} - {exactdate}
              </p>
              <p className="text-gray-700 text-base">
                <span role="img" aria-label="seat">💺</span> Seat: {selectedSeats.join(", ")}
              </p>
              <p className="text-gray-700 text-base">
                <span role="img" aria-label="boarding">📍</span> Boarding: {pickupcity}
              </p>
              <p className="text-gray-700 text-base">
                <span role="img" aria-label="dropping">📍</span> Dropping: {dropcity}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold text-gray-800 mb-2">Passenger Information</h4>
              {passengers.map((p, index) => (
                <p key={index} className="text-gray-600 text-sm">
                  {p.name} ({p.gender}, {p.age}) - Seat {p.seatNumber}
                </p>
              ))}
            </div>
            <div className="border-t border-gray-300 pt-4">
              <p className="text-gray-700 text-base">📩 Your ticket will be sent to:</p>
              <p className="font-semibold text-gray-800">{contact.phone}</p>
              <p className="font-semibold text-gray-800">{contact.email}</p>
              <p className="text-gray-700 text-base">Ticket Price : {price} </p>
              <p className="text-gray-700 text-base">No. of Tickets :{countseats} </p>
              <p className="text-gray-700 text-base">Total Ticket Price :{ShowPrice}</p>
            </div>
            
          <div>
            {/* Render HotelList if needed */}
            {foodOrderData && (
              <div className="mt-4 p-4 border border-gray-300 rounded">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Order Summary</h2>
                <p className="text-gray-700">Food Total: ₹{foodOrderData.foodTotal}</p>
                <p className="text-gray-700">Final Payment Amount: ₹{foodOrderData.finalPrice}</p>
              </div>
            )}
            {/* Payment processing buttons etc. */}
          </div>
        </div>
          <div className="mt-4 p-4">
            <button 
              onClick={handlePayment}
              className="bg-green-500 text-white px-4 py-2 rounded-lg w-full mb-3"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal for HotelList */}
      {showHotelList && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-3/4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end">
              <button 
                onClick={() => setShowHotelList(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
            <HotelList stop={stops} onFoodOrderConfirm={handleFoodOrderConfirm} />
          </div>
        </div>
      )}
        {/* Modal for Payment Gateway */}
        {showGateway && (
        <PaymentGateway
          onConfirm={handleGatewayConfirm}
          onCancel={() => setShowGateway(false)}
        />
      )}
    </div>
  );
}

export default Payment;
