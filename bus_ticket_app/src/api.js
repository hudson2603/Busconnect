// Fetch distinct pickup and drop cities
export const fetchCities = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/locations');
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    return await response.json(); // Returns { pickupCities, dropCities }
  } catch (error) {
    console.error('Error fetching cities:', error);
    return { pickupCities: [], dropCities: [] };
  }
};

// Fetching the buses 
  export const fetchBuses = async () => {
    try {
      const response = await fetch('/api/buses');  // Fetch bus data
      if (!response.ok) {
        throw new Error('Failed to fetch buses');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching buses:', error);
      return []; // Return empty array if there's an error
    }
  };

// Function for user login
export const loginUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {  // Ensure your backend defines this endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Failed to login');
    }
    return await response.json();  // This should return your JWT token and any other data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Function for user signup
export const signupUser = async (username,email, password) => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, email, password }),
    });
    if (!response.ok) {
      throw new Error('Failed to signup');
    }
    return await response.json();  // This should return a success message and a JWT token
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Fetch seat availability by bus and date
export const fetchSeatAvailability = async (busId, travelDate) => {
  try {
    // Format travelDate to "YYYY-MM-DD"
    const formattedDate = new Date(travelDate).toISOString().split("T")[0];
    console.log("Formatted travel date:", formattedDate);

    const response = await fetch("http://localhost:5000/api/seats/byBusDate", {
      method: "POST", // Use POST if your backend expects POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ busId, travelDate: formattedDate }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch seat availability");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching seat availability:", error);
    throw error;
  }
};


// Function to book seats
export const bookSeats = async (busId, travelDate, seatNumbers) => {
  try {
    const formattedDate = new Date(travelDate).toISOString().split("T")[0]; // "YYYY-MM-DD"

    const response = await fetch("http://localhost:5000/api/seats/book", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ busId, travelDate: formattedDate, seatNumbers }),
    });

    if (!response.ok) {
      throw new Error("Failed to book seats");
    }
    return await response.json(); // Returns updated seat status
  } catch (error) {
    console.error("Error booking seats:", error);
    throw error;
  }
};
// Fetching the stops
export const fetchStops = async (busId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/stops/${busId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch stops");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching stops:", error);
    return [];
  }
};

// Function to fetch hotels by stop
export const fetchHotels = async (stop) => {
  try {
    const response = await fetch(`http://localhost:5000/api/hotels?stop=${stop}`);
    if (!response.ok) {
      throw new Error("Failed to fetch hotels");
    }
    return await response.json(); // Expected to return { hotels: [...] }
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return { hotels: [] };
  }
};
// Function to send payment/booking details to backend
export const processBooking = async (orderData) => {
  try {
    const response = await fetch("http://localhost:5000/api/payment/charge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) {
      throw new Error("Booking failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error processing booking:", error);
    throw error;
  }
};
export const fetchBusLocation = async (busId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/bus/location/${busId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch bus location');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching bus location:", error);
    throw error;
  }
};