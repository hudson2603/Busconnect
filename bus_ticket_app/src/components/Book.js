import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PassengerDetails from "./PassengerDetails";
import Paymentstyle from "./Paymentstyle";
import st_logo from "./../assets/image/steering.jpg";
import FirstBar from "./FirstBar";
import BusFoodOrder from "../assets/image/Busfoodorder.webp";
import Loader from "./Loader";
import BusSlider from "./BusSlider";
import "../assets/css/Marquee.css"

function Book() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pickupcity, dropcity, date_of_travel, selectedbus, exactdate, stops } = location.state || {};

  // If no bus is selected, navigate to home or show an error.
  if (!selectedbus) {
    return <p className="text-red-500 text-center mt-10">No bus selected. Please go back and choose a bus.</p>;
  }
  // states--> overay
  const [showOverlay, setShowOveray] = useState(false);
  // Handle overlay
  const openPassengerDetails = () => setShowOveray(true);
  const closePassengerDetails = () => setShowOveray(false);
  // Handle passenger details Function
  function handlePassengerSubmit(passengerData) {
    console.log("Final Passenger Data:", passengerData);
  }

  // Extract bus details
  const busId = selectedbus._id;
  const busname = selectedbus.busName;

  // State to hold seat availability from the backend
  const [seatAvailability, setSeatAvailability] = useState(null);
  // State for tracking seats selected by the user
  const [selectedSeats, setSelectedSeats] = useState([]);
  // Formatted date
    const selectedDate = new Date(exactdate); // Convert to Date object
    console.log("selecteddate : ", selectedDate)
    // Format date as YYYY-MM-DD to match backend
    const formattedDate = selectedDate.getFullYear() + '-' +
      String(selectedDate.getMonth() + 1).padStart(2, '0') + '-' +
      String(selectedDate.getDate()).padStart(2, '0');
    console.log("Formatted dated",formattedDate);
  // Fetch seat availability using busId and travel date
  useEffect(() => {
    if (!busId || !exactdate) return;
    console.log(exactdate);
    const fetchSeats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/seats/byBusDate?busId=${busId}&date=${formattedDate}`
        );

        if (!response.ok) throw new Error("Failed to fetch seat availability");

        const data = await response.json();
        console.log("Seat availability:", data);

        // Ensure the response structure is correct
        if (!data || !data.seats) {
          throw new Error("Invalid response structure");
        }

        setSeatAvailability(data); // Update state correctly
      } catch (error) {
        console.error("Error fetching seat availability:", error);
      }
    };

    fetchSeats();
  }, [busId, exactdate ,formattedDate]);
  // Coverting and state handling for price
  const FloatPrice = parseFloat(selectedbus.price)
  const [ShowPrice, setShowPrice] = useState();
  console.log("Selection.lenght", FloatPrice * selectedSeats.length);
  console.log("parsefloat", parseFloat(selectedbus.price));
  useEffect(() => {
    setShowPrice(() => FloatPrice * selectedSeats.length);
  }, [selectedSeats])

  // If seatAvailability is still null, show a loading message
  if (!seatAvailability) {
    return (
      <div className="p-4 w-full h-172 items-center flex">
        <Loader/>
      </div>
    );
  }

  // Toggle seat selection (only if available)
  const handleSeatSelect = (seatNumber, currentStatus) => {
    if (currentStatus !== "available") return;
    setSelectedSeats((prev) =>
      prev.includes(seatNumber) ? prev.filter((s) => s !== seatNumber) : [...prev, seatNumber]
    );
  };

  // Render seats for a given deck (upper or lower)
  const renderSeats = (deck, deckName) => {
    const deckSeats = seatAvailability.seats.filter((seat) => seat.deck === deck);
    return (
      <div className="mb-4">
        <h4 className="font-semibold mb-2">{deckName}</h4>
        <div className="grid grid-cols-6 gap-2">
          {deckSeats.map((seat) => (
            <div
              key={seat.seatNumber}
              onClick={() => handleSeatSelect(seat.seatNumber, seat.status)}
              className={`p-2 text-xs text-center rounded cursor-pointer border ${seat.status === "booked"
                  ? "bg-gray-400 cursor-not-allowed"
                  : selectedSeats.includes(seat.seatNumber)
                    ? "bg-blue-600 text-white"
                    : "bg-white border-red-400"
                }`}
            >
              {seat.seatNumber} {seat.status === "booked" && "(Booked)"}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* FirstBar with overlay effect */}
      <div className={`relative z-10 ${showOverlay ? "bg-black bg-opacity-50" : ""}`}>
        <FirstBar />
      </div>
      <div className="mt-24 marquee-container">
        <div className="marquee px-24">
            You can order food at your stop and now available in our {busname}. Enjoy your meal with your Journey!!        
        </div>
      </div>
      <div className="flex container w-full">
        <div className="flex w-2/5 h-auto bg-gradient-to-r from-red-100 to-red-50 flex-col p-2 rounded-md shadow-sm shadow-gray-400">
          <div className="mb-2 text-2xl font-rethinkSans text-red-950">
            <p>{busname}
            <span className="text-sm text-gray-800">(AC Sleeper)</span>
            </p>
          </div>
          <div className="mb-2 flex container w-full">
            <p className="w-5/12 font-oxanium">
              Boarding point <br/>{pickupcity} <br /> {selectedbus.dept}
            </p>
            <p className="w-2/12 text-center space-y-2 font-oxanium">
              {exactdate}
              <br />
              {selectedbus.duration}
            </p>
            <p className="w-5/12 text-end font-oxanium">Dropping point <br/>{dropcity}</p>
          </div>
        </div>
        <div className="w-3/5 bg-gray-200">
          <BusSlider/>
        </div>
      </div>
      <br/>
      {/*Seat Layout*/}
      <div className="container flex w-full">
        <div className="p-2 border bg-zinc-200 w-9/12">
          <h3 className="mb-4 font-semibold text-lg font-rethinkSans">Select Your Seats</h3>
          <p className="bg-cyan-600 py-2 px-4 ml-8 font-rethinkSans flex">
            Click on an available seat to proceed with your transaction
          </p>
          <div className="p-4 container flex w-full">
            <div className="p-4 w-8/12">
              <h3 className="font-semibold text-lg font-rethinkSans">Lower Deck</h3>
              <div className="bg-white flex container w-full border-2 border-gray-300">
                <div className="w-1/12 border-l-8 border-gray-500">
                  <img src={st_logo} alt="steering" className="w-24 h-auto mt-8 opacity-80" />
                </div>
                <div className="border-l border-gray-500 h-48 ml-2 mt-8"></div>
                <div className="w-11/12 p-6">{renderSeats("lower", "Lower Deck")}</div>
              </div>
              <br />
              <h3 className="font-semibold text-lg font-rethinkSans">Upper Deck</h3>
              <div className="bg-white p-6 border-l-8 border-gray-500 border">
                {renderSeats("upper", "Upper Deck")}
              </div>
            </div>
            <div className="w-3/12 p-3">
              <h2 className="font-semibold text-lg font-rethinkSans tracking-wide">SEAT LEGEND</h2>
              <div className="p-4">
                <p className="border-red-400 border w-12 h-7 font-oxanium">
                  <span className="ml-16">Available</span>
                </p>
                <br />
                <p className="bg-gray-400 w-12 h-7 font-oxanium">
                  <span className="ml-16">Unavailable</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Selection seat display */}
        <div className="w-4/12 ">
          {selectedSeats.length > 0 ? <Paymentstyle
            pickupcity={pickupcity}
            dropcity={dropcity}
            date_of_travel={exactdate}
            selectedbus={selectedbus}
            selectedSeats={selectedSeats}
            price={selectedbus.price}
            duration={selectedbus.duration}
            countseats={selectedSeats.length}
            openPassengerDetails={openPassengerDetails}
            ShowPrice={ShowPrice}
            formattedDate = {formattedDate}
            stops={stops}
          /> : <img src= {BusFoodOrder} alt ="image" className="  h-96" />}
        </div>
        {/* Passenger details */}

        {selectedSeats.length > 0 && showOverlay && (
          <div className="fixed -inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
            <PassengerDetails
              selectedSeats={selectedSeats}
              closeOverlay={closePassengerDetails}
              onSubmit={handlePassengerSubmit}
              price={selectedbus.price}
              countseats={selectedSeats.length}
              ShowPrice={ShowPrice}
              stops={stops}
              pickupcity={pickupcity}
              dropcity={dropcity}
              exactdate={exactdate}
              departure ={selectedbus.dept}
              selectedbus={selectedbus}
              duration={selectedbus.duration}
              formattedDate = {formattedDate}
            />
          </div>
        ) }
      </div>
    </div>
  );
}

export default Book;
