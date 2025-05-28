import React, { useState, useEffect } from "react";
import { fetchHotels } from "../api";
import Loader from "./Loader";

const HotelList = ({ stop, onFoodOrderConfirm }) => {
  // State for fetched hotels for the given stop
  const [hotels, setHotels] = useState([]);
  // State to track if a hotel is selected (null means no selection)
  const [selectedHotel, setSelectedHotel] = useState(null);
  // State for food order: { foodItemIndex: quantity, ... }
  const [foodOrder, setFoodOrder] = useState({});
  // State for the total food price
  const [foodTotal, setFoodTotal] = useState(0);

  // Fetch hotels for the provided stop
  useEffect(() => {
    if (stop) {
      fetchHotels(stop)
        .then((data) => setHotels(data.hotels))
        .catch((err) => console.error("Error fetching hotels:", err));
    }
  }, [stop]);

  // When a hotel is selected, initialize food order state for its food items.
  useEffect(() => {
    if (selectedHotel) {
      const initialOrder = {};
      selectedHotel.foodItems.forEach((item, idx) => {
        initialOrder[idx] = 0;
      });
      setFoodOrder(initialOrder);
      setFoodTotal(0);
    }
  }, [selectedHotel]);

  // Update quantity and recalculate food total
  const updateQuantity = (idx, change) => {
    setFoodOrder((prevOrder) => {
      const updatedOrder = { ...prevOrder };
      const currentQty = updatedOrder[idx] || 0;
      const newQty = Math.max(0, currentQty + change);
      updatedOrder[idx] = newQty;
      // Recalculate total based on updatedOrder
      const total = selectedHotel.foodItems.reduce(
        (sum, item, index) => sum + (updatedOrder[index] || 0) * item.price,
        0
      );
      setFoodTotal(total);
      return updatedOrder;
    });
  };

  // Confirm food order and pass data up to parent (or navigate to Payment.js)
  const handleConfirm = () => {
    const selectedItems = selectedHotel.foodItems.map((item, idx) => {
      const quantity = foodOrder[idx] || 0;
      if (quantity > 0) {
        return { ...item, quantity };
      }
      return null;
    })
    .filter((item) => item !== null);
  
  // Pass the selectedItems array along with hotel details and foodTotal
  onFoodOrderConfirm({
    hotel: selectedHotel,
    selectedItems,      // <-- add this property
    foodOrder,          // optional: the raw object if needed
    foodTotal,
  });
};

  // Render the hotel list view (Step 1)
  const renderHotelList = () => (
 
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Hotels at {stop}</h2>
      {hotels.length > 0 ? (
        hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="border p-4 mb-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
            onClick={() => setSelectedHotel(hotel)}
          >
            <h4 className="font-bold text-lg">{hotel.hotelName}</h4>
            <p className="text-gray-600">{hotel.address}</p>
            <div className="mt-2 text-gray-800">Food Items Available</div>
          </div>
        ))
      ) : (
        <><p>No hotels available for this stop.</p><Loader /></>
      )}
    </div>
  );

  // Render the food ordering view (Step 2)
  const renderFoodOrder = () => (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Order Food at {selectedHotel.hotelName}
        </h2>
        <button
          onClick={() => setSelectedHotel(null)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Back
        </button>
      </div>
      {selectedHotel.foodItems.map((item, idx) => (
        <div key={idx} className="flex justify-between items-center border-b py-2">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-600">₹{item.price}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(idx, -1)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              -
            </button>
            <span className="mx-2">{foodOrder[idx] || 0}</span>
            <button
              onClick={() => updateQuantity(idx, 1)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}
      <div className="mt-4">
        <h3 className="font-bold text-lg">
          Total Food Price: ₹{foodTotal}
        </h3>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleConfirm}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Confirm Food Order
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {selectedHotel ? renderFoodOrder() : renderHotelList()}
    </div>
  );
};

export default HotelList;
