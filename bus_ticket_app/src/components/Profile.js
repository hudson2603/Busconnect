// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileLoader from "./ProfileLoader"
import Loader from './Loader';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [previousJourneys, setPreviousJourneys] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/');
      return;
    }

    // Fetch profile (optional)
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        // Optionally, you might want to set profile as null but still try fetching orders
      } finally {
        setLoadingProfile(false);
      }
    };

    // Fetch orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/profile/orders", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        console.log("Orders fetched:", response.data);
        // Expect response.data to have { currentBookings, previousJourneys }
        setCurrentBookings(response.data.currentBookings || []);
        setPreviousJourneys(response.data.previousJourneys || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchProfile();
    fetchOrders();
  }, [navigate]);

  if (loadingProfile || loadingOrders) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ProfileLoader/>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Optional: Display Profile Info if available */}
      {profile ? (
        <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-md rounded mb-8">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b">
                <td className="py-2 font-semibold">Username:</td>
                <td className="py-2">{profile.username}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-semibold">Email:</td>
                <td className="py-2">{profile.email}</td>
              </tr>
              {profile.phone && (
                <tr className="border-b">
                  <td className="py-2 font-semibold">Phone:</td>
                  <td className="py-2">{profile.phone}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        // If profile is not available, you can show a message or simply omit it.
        <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-md rounded mb-8">
          <p className="text-lg text-red-600"><ProfileLoader></ProfileLoader>Profile data not available.</p>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Bookings</h2>
        {currentBookings.length > 0 ? (
          currentBookings.map((order) => (
            <div key={order._id} className="border rounded p-4 mb-4 bg-white shadow">
              <p>
                <span className="font-semibold">Travel Date:</span>{" "}
                {new Date(order.exactDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short", 
                  day: "numeric"
                })}
              </p>
              <p>
                <span className="font-semibold">Selected Seats:</span> {order.seats.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Total Amount:</span> Rs. {order.totalAmount}
              </p>
              <button
                onClick={() => navigate("/ticket", { state: { order } })}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Ticket
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No current bookings.</p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Previous Journeys</h2>
        {previousJourneys.length > 0 ? (
          previousJourneys.map((order) => (
            <div key={order._id} className="border rounded p-4 mb-4 bg-white shadow">
              <p>
                <span className="font-semibold">Travel Date:</span>{" "}
                {new Date(order.exactDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </p>
              <p>
                <span className="font-semibold">Selected Seats:</span> {order.seats.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Total Amount:</span> Rs. {order.totalAmount}
              </p>
              <button
                onClick={() => navigate("/ticket", { state: { order } })}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                View Ticket
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No previous journeys.</p>
        )}
      </section>
      
      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;
