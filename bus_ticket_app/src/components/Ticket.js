import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "./../assets/css/MapOverride.css"
import Loader from "./Loader"

// Custom bus icon (you can replace the icon URL with a bus icon image)
const busIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61088.png", // example bus icon URL
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});
const destinationIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // replace with your destination icon URL if needed
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
  // Define destination coordinates separately
const destinationCoords = [12.9352, 77.6245];
// Helper function to interpolate between two positions
const interpolatePosition = (start, end, factor) => {
  return [
    start[0] + (end[0] - start[0]) * factor,
    start[1] + (end[1] - start[1]) * factor,
  ];
};


const AnimatedMarker = ({ position, onAnimationEnd }) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const previousPositionRef = useRef(position);

  useEffect(() => {
    let animationFrame;
    let startTime;
    const duration = 3000; // 3 seconds transition

    const animateMarker = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const factor = Math.min(elapsed / duration, 1);
      const newPos = interpolatePosition(previousPositionRef.current, position, factor);
      setCurrentPosition(newPos);
      if (factor < 1) {
        animationFrame = requestAnimationFrame(animateMarker);
      } else {
        previousPositionRef.current = position;
        if (onAnimationEnd) onAnimationEnd();
      }
    };

    animationFrame = requestAnimationFrame(animateMarker);
    return () => cancelAnimationFrame(animationFrame);
  }, [position, onAnimationEnd]);

  return (
    <Marker position={currentPosition} icon={busIcon}>
      <Popup>
        Bus is moving... <br />
        Current: [{currentPosition[0].toFixed(4)}, {currentPosition[1].toFixed(4)}]
      </Popup>
    </Marker>
  );
};

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order ,pickupcity ,dropcity ,duration,exactdate , countseats ,selectedSeats,selectedbus ,departure} = location.state || {};
  const [busLocation, setBusLocation] = useState(null);
  const [trackingError, setTrackingError] = useState(null);

  // Polling interval in milliseconds (e.g., every 5000ms = 5 seconds)
  const POLLING_INTERVAL = 5000;

useEffect(() => {
  // Only poll if we have a valid bus object and an ID.
  if (!selectedbus || !selectedbus._id) return;

  const fetchBusLocation = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/bus/location/${selectedbus._id}`);
      setBusLocation(response.data);
      setTrackingError(null);
    } catch (error) {
      console.error("Error fetching bus location:", error);
      setTrackingError("Unable to track bus location at the moment.");
    }
  };

  // Initial fetch
  fetchBusLocation();

  // Set interval for polling every 5 seconds
  const intervalId = setInterval(() => {
    fetchBusLocation();
  }, POLLING_INTERVAL);

  // Clear interval when component unmounts
  return () => clearInterval(intervalId);
}, [selectedbus]);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-start justify-center bg-gray-100 p-4">
        <p className="text-lg text-gray-700 mb-4">No ticket data available.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
        >
          Go Home
        </button>
      </div>
    );
  }

  // Destructure order data
  const {
    passengers,
    contact,
    foodOrder,
    totalAmount,
    createdAt
  } = order;

  // Format dates

  const bookingDate = new Date(createdAt).toLocaleString("en-US");

  return (
   <div className = 'w-full flex flex-col md:flex-row mt-2'> 
    <div className="bg-gray-100 w-full md:w-1/2 p-4 pt-10 mt-16">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Ticket
        </h1>

        {/* Bus Details */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Bus Details
          </h2>
          <p className="text-gray-700">
            <span className="font-medium">Bus Name:</span> {selectedbus.busName}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">From:</span> {pickupcity}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">To:</span> {dropcity}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Departure:</span> {departure}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Journey Time:</span> {duration}
          </p>
          {/* You can add more details like bus name, route, departure, etc. if available */}
        </div>

        {/* Booking Details */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Booking Details
          </h2>
          <p className="text-gray-700">
            <span className="font-medium">Travel Date:</span> {exactdate}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">No.of Tickets:</span> {countseats}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Selected Seats:</span> {selectedSeats.join(", ")}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Total Amount:</span> Rs. {totalAmount}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Booking Time:</span> {bookingDate}
          </p>
        </div>

        {/* Passenger Details */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Passenger Details
          </h2>
          {passengers && passengers.length > 0 ? (
            passengers.map((p, index) => (
              <div key={index} className="mb-2">
                <p className="text-gray-700">
                  <span className="font-medium">Passenger {index + 1}:</span> {p.name} (Age: {p.age}, Gender: {p.gender}) - Seat {p.seatNumber}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No passenger details provided.</p>
          )}
        </div>

        {/* Contact Details */}
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Details
          </h2>
          <p className="text-gray-700">
            <span className="font-medium">Phone:</span> {contact.phone}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Email:</span> {contact.email}
          </p>
        </div>

        {/* Food Order Details */}
{/* Food Order Details */}
{/* Food Order Details */}
<div className="border-b border-gray-300 pb-4 mb-4">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">
    Food Order
  </h2>
  {foodOrder ? (
    <div>
      {/* Hotel Details */}
      <p className="text-gray-700">
        <span className="font-medium">Stop:</span> {foodOrder.hotel?.stop}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Hotel Name:</span> {foodOrder.hotel?.hotelName}
      </p>
      <p className="text-gray-700">
        <span className="font-medium">Address:</span> {foodOrder.hotel?.address}
      </p>

      {/* Show ONLY the user's selected items */}
      <h3 className="text-gray-800 mt-3 font-medium">Your Food Ordered Items:</h3>
      {foodOrder.selectedItems && foodOrder.selectedItems.length > 0 ? (
        <ul className="list-disc list-inside">
          {foodOrder.selectedItems.map((item) => (
            <li key={item._id}>
              {item.name} - Rs. {item.price}  - 
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No food items selected.</p>
      )}
    </div>
  ) : (
    <p className="text-gray-700">No food order placed.</p>
  )}
</div>


        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>

  {/* Live Tracking Map Section */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 mb-10 h-auto w-full md:w-1/2 map-column">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Live Bus Tracking</h2>
        {busLocation ? (
          <MapContainer
            center={[busLocation.latitude, busLocation.longitude]}
            zoom={13}
            scrollWheelZoom={false}
            className="w-full h-96 rounded"
          >
            <TileLayer
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Animated bus marker */}
            <AnimatedMarker position={[busLocation.latitude, busLocation.longitude]} />
            {/* Destination marker */}
            <Marker position={destinationCoords} icon={destinationIcon}>
              <Popup>
                Destination <br /> [{destinationCoords[0]}, {destinationCoords[1]}]
              </Popup>
            </Marker>
            {/* Draw route from bus location to destination */}
            <Polyline positions={[[busLocation.latitude, busLocation.longitude], destinationCoords]} color="blue" />
          </MapContainer>
        ) : trackingError ? (
          <p className="text-red-600">{trackingError}</p>
        ) : (
          <Loader/>
        )}
      </div>
    </div>
  );
};

export default Ticket;
