import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const PassengerDetails = ({ selectedSeats, closeOverlay, onSubmit ,
  price ,ShowPrice, stops,countseats , 
   pickupcity ,dropcity,duration,selectedbus,exactdate,formattedDate,departure
}) => {
  
  const [passengers, setPassengers] = useState([]);
  const [contact, setContact] = useState({
    phone: "",
    email: "",
  });

  useEffect(() => {
    const initialPassengers = selectedSeats.map((seat, index) => ({
      id: index + 1,
      name: "",
      age: "",
      gender: "",
      seatNumber: seat,
    }));
    setPassengers(initialPassengers);
  }, [selectedSeats]);

  // Handle input change for passengers
  const handleInputChange = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };
  // Handle contact details change
  const handleContactChange = (field, value) => {
    setContact({ ...contact, [field]: value });
  };
 const Navigate = useNavigate();
// Submit handler
  const handleSubmit = () => {
    const allPassengerDetailsFilled = passengers.every(
      (p) => p.name && p.age && p.gender
    );
    
    // Check if contact details are provided
    if (!allPassengerDetailsFilled || !contact.phone || !contact.email) {
      alert("Fill all Passenger details and contact details");
      return;
    }
    else{
    onSubmit(passengers);
    closeOverlay();
    Navigate("/Payment",{
        state:{
            selectedSeats:selectedSeats,
            ShowPrice:ShowPrice,
            stops:stops,
            selectedSeats:selectedSeats,
            pickupcity:pickupcity,
            dropcity:dropcity,
            duration:duration,
            selectedbus:selectedbus,
            departure:departure,
            exactdate:exactdate,
            price:price,
            countseats:countseats,
            passengers:passengers,
            contact:contact,
            formatDate : formattedDate

        }
    })
  }
  };

  return (
    <div className="bg-white w-[500px] max-h-[80vh] p-6 rounded-xl shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      {/* Passenger Information */}
      <h2 className="text-lg font-semibold mb-4">Passenger Details</h2>
      {/* Close Button (Cross Icon) */}
          {/* <button
          onClick={}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition"
          >
            <IoClose size={24} />
          </button> */}

      <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {passengers.map((passenger, index) => (
          <div key={index} className="mb-4 p-4 border rounded-lg bg-gray-100">
            <h3 className="font-semibold text-gray-700 mb-2">
              Passenger {index + 1} - <span className="font-bold text-black">Seat {passenger.seatNumber}</span>
            </h3>

            {/* Name Input */}
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              value={passenger.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
            />

            {/* Gender Selection */}
            <label className="block text-sm font-medium mt-2">Gender</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`gender-${index}`}
                  value="Male"
                  checked={passenger.gender === "Male"}
                  onChange={(e) => handleInputChange(index, "gender", e.target.value)}
                  className="mr-1"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`gender-${index}`}
                  value="Female"
                  checked={passenger.gender === "Female"}
                  onChange={(e) => handleInputChange(index, "gender", e.target.value)}
                  className="mr-1"
                />
                Female
              </label>
            </div>

            {/* Age Input */}
            <label className="block text-sm font-medium mt-2">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              value={passenger.age}
              onChange={(e) => handleInputChange(index, "age", e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
            />

          </div>
        ))}
      </div>

      {/* Contact Details */}
      <div className="mt-6 p-4 border rounded-lg bg-gray-100">
        <h3 className="font-semibold text-gray-700 mb-2">Contact Details</h3>

        {/* Phone Number */}
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="tel"
          placeholder="Enter Phone Number"
          value={contact.phone}
          onChange={(e) => handleContactChange("phone", e.target.value)}
          className="w-full p-2 border rounded-lg mt-1"
        />

        {/* Gmail */}
        <label className="block text-sm font-medium mt-2">Gmail</label>
        <input
          type="email"
          placeholder="Enter Gmail"
          value={contact.email}
          onChange={(e) => handleContactChange("email", e.target.value)}
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>
        
      
      {/* Payment and Proceed */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-bold">Total Amount: <span className="text-gray-800">RS. {ShowPrice}</span></span>
        <button onClick={handleSubmit} className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg">
          PROCEED TO PAY
        </button>
      </div>
    </div>
  );
};

export default PassengerDetails;
