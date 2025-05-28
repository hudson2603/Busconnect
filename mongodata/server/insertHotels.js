// insertHotels.js
const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/bc_db", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Sample Data: Hotels for a given stop
const sampleHotels = [
  {
    stop: "Bangalore",
    hotelName: "Hotel Royale",
    address: "MG Road, Bangalore",
    foodItems: [
      { name: "Veg Biryani", price: 150 },
      { name: "Chicken Curry", price: 250 },
      { name: "Naan", price: 40 },
        { name: "Roti", price: 20 },
        { name: "Paratha", price: 50 },
        { name: "Biryani", price: 260 },
        { name: "Fish Curry", price: 220 },
        { name: "Mutton Curry", price: 270 },
    ]
  },
  {
    stop: "Bangalore",
    hotelName: "The Grand Bangalore",
    address: "Brigade Road, Bangalore",
    foodItems: [
      { name: "Paneer Butter Masala", price: 130 },
      { name: "Chicken Curry", price: 200 },
      { name: "Naan", price: 40 },
        { name: "Roti", price: 20 },
        { name: "Paratha", price: 50 },
        { name: "Biryani", price: 200 },
    ]
  },
  {
    stop: "Bangalore",
    hotelName: "Hotel Royale",
    address: "MG Road, Bangalore",
    foodItems: [
      { name: "Veg Biryani", price: 150 },
      { name: "Chicken Curry", price: 200 },
      { name: "Paneer Tikka", price: 180 },
      { name: "Chicken Tikka", price: 200 },
      { name: "Mutton Biryani", price: 240 },
      { name: "Roti", price: 20 },
      { name: "Paratha", price: 50 },

    ]
  },
  {
    stop: "Delhi",
    hotelName: "Delhi Inn",
    address: "Connaught Place, Delhi",
    foodItems: [
      { name: "Chole Bhature", price: 100 },
      { name: "Paratha", price: 80 },
      { name: "Paneer Butter Masala", price: 130 },
      { name: "Chicken Curry", price: 150 },
      { name: "Naan", price: 45 },
        { name: "Roti", price: 25 },
        { name: "Biryani", price: 200 },
    ]
  },
  {
    stop: "Delhi",
    hotelName: "Delhi Hotel",
    address: "A.k Nagar, Delhi",
    foodItems: [
      { name: "Paneer Butter Masala", price: 140 },
      { name: "Chicken Curry", price:190 },
      { name: "Naan", price: 65 },
        { name: "Roti", price: 35 },
        { name: "Paratha", price: 25 },
        { name: "Biryani", price: 350 },
    ]
  },    
  {
    stop: "Delhi",
    hotelName: "Delhi Residency",
    address: "Connaught Place, Delhi",
    foodItems: [
      { name: "Paratha", price: 80 },
      { name: "Paneer Butter Masala", price: 200 },
      { name: "Chicken Curry", price: 250 },
      { name: "Naan", price: 35 },
        { name: "Roti", price: 20 },
        { name: "Biryani", price: 400 },
    ]
  },

    {
      stop: "Mumbai",
      hotelName: "Mumbai Inn",
      address: "Marine Drive, Mumbai",
      foodItems: [
        { name: "Vada Pav", price: 50 },
        { name: "Pav Bhaji", price: 100 },
        { name: "Paneer Butter Masala", price: 130 },
        { name: "Chicken Curry", price: 200 },
        { name: "Naan", price: 40 },
          { name: "Roti", price: 20 },
          { name: "Paratha", price: 50 },
          { name: "Biryani", price: 200 },
      ]
    },    {
        stop: "Mumbai",
        hotelName: "HRS Hotel",
        address: "Scalar road, Mumbai",
        foodItems: [
          { name: "Vada Pav", price: 75 },
          { name: "Chicken Biryani", price: 180 },
          { name: "Chicken Curry", price: 210 },
          { name: "Paneer Tikka", price: 300 },
          { name: "Chicken Tikka", price: 350 },
          { name: "Mutton Biryani", price: 240 },
          { name: "Roti", price: 45 },
          { name: "Paratha", price: 50 },
        ]
      },    {
        stop: "Mumbai",
        hotelName: "QN Hotel",
        address: "Malabar road, Mumbai",
        foodItems: [
          { name: "Vada Pav", price: 50 },
          { name: "Pav Bhaji", price: 100 },
          { name: "Paneer Butter Masala", price: 130 },
          { name: "Chicken Curry", price: 200 },
          { name: "Naan", price: 40 },
            { name: "Roti", price: 20 },
            { name: "Paratha", price: 50 },
            { name: "Biryani", price: 200 },
        ]
      },
      {
        stop: "Mumbai",
        hotelName: "Sathya Restaurant",
        address: "Moon road, Mumbai",
        foodItems: [
          { name: "Vada Pav", price: 50 },
          { name: "Pav Bhaji", price: 100 },
          { name: "Paneer Butter Masala", price: 130 },
          { name: "Chicken Curry", price: 200 },
          { name: "Naan", price: 40 },
            { name: "Roti", price: 20 },
            { name: "Paratha", price: 50 },
            { name: "Biryani", price: 200 },
        ]
      },
      {
        stop: "Mumbai",
        hotelName: "One & One Only Hotel",
        address: "Beach road, Mumbai",
        foodItems: [
          { name: "Vada Pav", price: 50 },
          { name: "Pav Bhaji", price: 100 },
          { name: "Chole Bhature", price: 100 },
          { name: "Paratha", price: 80 },
          { name: "Paneer Butter Masala", price: 130 },
          { name: "Chicken Curry", price: 150 },
          { name: "Naan", price: 45 },
            { name: "Roti", price: 25 },
            { name: "Biryani", price: 200 },
        ]
      },
    
    {
      stop: "Manali",
      hotelName: "Manali Retreat",
      address: "Old Manali, Himachal Pradesh",
      foodItems: [
        { name: "Sidu", price: 150 },
        { name: "Trout", price: 300 },
        { name: "Chicken Curry", price: 150 },
        { name: "Naan", price: 45 },
          { name: "Roti", price: 25 },
          { name: "Biryani", price: 200 },
      ]
    },
    {
      stop: "Mangaluru",
      hotelName: "Mangaluru Beach Resort",
      address: "Panambur, Mangaluru",
      foodItems: [
        { name: "Fish Curry", price: 200 },
        { name: "Rice", price: 80 },
        { name: "Chicken Curry", price: 150 },
        { name: "Naan", price: 45 },
          { name: "Roti", price: 25 },
          { name: "Biryani", price: 200 },
      ]
    },
    {
        stop: "Mangaluru",
        hotelName: "Bahu reach Hotel",
        address: "Nambur, Mangaluru",
        foodItems: [
          { name: "Fish Curry", price: 200 },
          { name: "Rice", price: 90 },
          { name: "Chole Bhature", price: 100 },
          { name: "Paratha", price: 40 },
          { name: "Paneer Butter Masala", price: 200 },
          { name: "Chicken Curry", price: 100 }
        ]
      },
      {
        stop: "Mangaluru",
        hotelName: "Sun hotel",
        address: "Panambur, Mangaluru",
        foodItems: [
          { name: "Fish Curry", price: 250 },
          { name: "Rice", price: 100 },
          { name: "Chole Bhature", price: 200 },
          { name: "Paratha", price: 25 },
          { name: "Paneer Butter Masala", price: 145 },
          { name: "Chicken Curry", price: 150 }
        ]
      },
    {
      stop: "Wayanad",
      hotelName: "Wayanad Nature Resort",
      address: "Kalpetta, Wayanad",
      foodItems: [
        { name: "Puttu", price: 70 },
        { name: "Kadala Curry", price: 90 },
        { name: "Beef Curry", price: 200 },
        { name: "Paratha", price: 80 },
        { name: "Chicken Curry", price: 150 }
      ]
    },
    {
      stop: "Agra",
      hotelName: "Agra Palace",
      address: "Near Agra Fort, Agra",
      foodItems: [
        { name: "Petha", price: 50 },
        { name: "Dal Makhani", price: 150 },
        { name: "Veg Biryani", price: 150 },
        { name: "Chicken Curry", price: 250 },
        { name: "Naan", price: 40 },
          { name: "Roti", price: 20 },
          { name: "Paratha", price: 50 },
          { name: "Biryani", price: 260 },
          { name: "Fish Curry", price: 220 },
          { name: "Mutton Curry", price: 270 },
      ]
    },
    {
        stop: "Agra",
        hotelName: "Mobile Restaurant",
        address: "Gate road, Agra",
        foodItems: [
          { name: "Petha", price: 50 },
          { name: "Dal Makhani", price: 150 },
          { name: "Veg Biryani", price: 150 },
          { name: "Chicken Curry", price: 250 },
          { name: "Naan", price: 40 },
            { name: "Roti", price: 20 },
            { name: "Paratha", price: 50 },
            { name: "Biryani", price: 260 },
            { name: "Fish Curry", price: 220 },
            { name: "Mutton Curry", price: 270 },
        ]
      },
      {
        stop: "Agra",
        hotelName: "ARS Palace",
        address: "H.Colony, Agra",
        foodItems: [
          { name: "Petha", price: 50 },
          { name: "Dal Makhani", price: 150 },
          { name: "Veg Biryani", price: 150 },
          { name: "Chicken Curry", price: 250 },
          { name: "Naan", price: 40 },
            { name: "Roti", price: 20 },
        ]
      },
    {
      stop: "Hyderabad",
      hotelName: "Hyderabad Grand",
      address: "Banjara Hills, Hyderabad",
      foodItems: [
        { name: "Hyderabadi Biryani", price: 450 },
        { name: "Mirchi ka Salan", price: 100 },
        { name: "Chicken Curry", price: 150 },
        { name: "Naan", price: 50 },
          { name: "Roti", price: 10 },
          { name: "Paratha", price: 50 },
          { name: "Biryani", price: 560 },
          { name: "Fish Curry", price: 220 },
          { name: "Mutton Curry", price: 220 },
      ]
    },
    {
        stop: "Hyderabad",
        hotelName: "Hari hotel",
        address: "Ban road, Hyderabad",
        foodItems: [
          { name: "Hyderabadi Biryani", price: 250 },
          { name: "Mirchi ka Salan", price: 300 },
          {name: "Biryani", price: 120 },
          { name: "Fish Curry", price: 210 },
          { name: "Mutton Curry", price: 280 },
        ]
      },
      {
        stop: "Hyderabad",
        hotelName: "Biriyani Spot",
        address: "CO & CO conlony, Hyderabad",
        foodItems: [
          { name: "Hyderabadi Biryani", price: 250 },
          { name: "Mirchi ka Salan", price: 100 },
          {name: "Biryani", price: 120 },
        ]
      },
      {
        stop: "Hyderabad",
        hotelName: "Garden Restaurant",
        address: "Eastside view road, Hyderabad",
        foodItems: [
          { name: "Hyderabadi Biryani", price: 250 },
          { name: "Mirchi ka Salan", price: 100 },
          { name: "Poha", price: 100 },
          { name: "Chole Bhature", price: 150 },
          { name: "Paneer Butter Masala", price: 180 }
        ]
      },
    {
      stop: "Kochi",
      hotelName: "Kochi Seaside",
      address: "Fort Kochi, Kochi",
      foodItems: [
        { name: "Meen Pollichathu", price: 300 },
        { name: "Appam", price: 120 },
        { name: "Paneer Tikka", price: 180 },
        { name: "Chicken Tikka", price: 200 },
        { name: "Mutton Biryani", price: 240 },
        { name: "Roti", price: 20 },
        { name: "Paratha", price: 50 },
      ]
    },
    {
        stop: "Kochi",
        hotelName: "See & sea Restaurant",
        address: "Beach road, Kochi",
        foodItems: [
          { name: "Meen Pollichathu", price: 300 },
          { name: "Appam", price: 120 },
          { name: "Chicken Curry", price: 250 },
          { name: "Naan", price: 40 },
        ]
      },
      {
        stop: "Kochi",
        hotelName: "Only People Hotel ",
        address: "new York road, Kochi",
        foodItems: [
          { name: "Meen Pollichathu", price: 300 },
          { name: "Appam", price: 120 },
          { name: "Chicken Curry", price: 250 },
        ]
      },
      {
        stop: "Kochi",
        hotelName: "Kochi Seaside",
        address: "Fort Kochi, Kochi",
        foodItems: [
          { name: "Meen Pollichathu", price: 300 },
          { name: "Appam", price: 120 },
          { name: "Chicken Curry", price: 150 },
          { name: "Naan", price: 50 },
            { name: "Roti", price: 10 },
            { name: "Paratha", price: 50 },
            { name: "Biryani", price: 560 },
            { name: "Fish Curry", price: 220 },
            { name: "Mutton Curry", price: 220 },
        ]
      },
    {
      stop: "Pune",
      hotelName: "Now Available",
      address: "TVK road, Pune",
      foodItems: [
        { name: "Misal Pav", price: 80 },
        { name: "Vada Pav", price: 40 },
        { name: "Chicken Curry", price: 150 },
        { name: "Naan", price: 50 },
          { name: "Roti", price: 10 },
          { name: "Paratha", price: 50 },
          { name: "Biryani", price: 560 },
          { name: "Fish Curry", price: 220 },
          { name: "Mutton Curry", price: 220 },
      ]
    },
    {
        stop: "Pune",
        hotelName: "Old City Hotel",
        address: "Race course road, Pune",
        foodItems: [
          { name: "Misal Pav", price: 80 },
          { name: "Vada Pav", price: 40 },
          { name: "Paneer Tikka", price: 180 },
          { name: "Chicken Tikka", price: 200 },
          { name: "Mutton Biryani", price: 240 },
          { name: "Roti", price: 20 },
          
        ]
      },
      {
        stop: "Pune",
        hotelName: "Pune Residency",
        address: "FC Road, Pune",
        foodItems: [
          { name: "Misal Pav", price: 80 },
          { name: "Vada Pav", price: 40 },
          { name: "Chicken Curry", price: 150 },
          { name: "Naan", price: 50 },
            { name: "Roti", price: 10 },
            { name: "Paratha", price: 50 },
            { name: "Biryani", price: 560 },
            { name: "Fish Curry", price: 220 },
            { name: "Mutton Curry", price: 220 },
        ]
      },
    {
      stop: "Chikmangaluru",
      hotelName: "Northwest restaurant",
      address: "Southern, Chikmangaluru",
      foodItems: [
        { name: "Neer Dosa", price: 60 },
        { name: "Saaru", price: 100 },
        { name: "Chicken Curry", price: 250 },
        { name: "Naan", price: 40 },
      ]
    },
    {
        stop: "Chikmangaluru",
        hotelName: "New hotel",
        address: "Central, Chikmangaluru",
        foodItems: [
          { name: "Neer Dosa", price: 60 },
          { name: "Saaru", price: 100 },
          { name: "Chicken Curry", price: 150 },
          { name: "Naan", price: 50 },
            { name: "Roti", price: 10 },
            { name: "Paratha", price: 50 },
            { name: "Biryani", price: 560 },
            { name: "Fish Curry", price: 220 },
            { name: "Mutton Curry", price: 220 },
        ]
      },
      {
        stop: "Chikmangaluru",
        hotelName: "Chikmangaluru Inn",
        address: "Central, Chikmangaluru",
        foodItems: [
          { name: "Neer Dosa", price: 60 },
          { name: "Saaru", price: 100 },
          { name: "Paneer Tikka", price: 180 },
          { name: "Chicken Tikka", price: 200 },
          { name: "Mutton Biryani", price: 240 },
          { name: "Roti", price: 20 },
        ]
      },
    {
      stop: "palakkad",
      hotelName: "Raw hotel",
      address: "Palakkad road, Kerala",
      foodItems: [
        { name: "Thalappakatti", price: 150 },
        { name: "Parotta", price: 50 },
        { name: "Paneer Tikka", price: 180 },
        { name: "Chicken Tikka", price: 200 },
        { name: "Mutton Biryani", price: 240 },
        { name: "Roti", price: 20 },
      ]
    },
    {
        stop: "palakkad",
        hotelName: "Palakkad Residency",
        address: "Palakkad road, Kerala",
        foodItems: [
          { name: "Thalappakatti", price: 150 },
          { name: "Parotta", price: 50 },
          { name: "Chicken Curry", price: 150 },
          { name: "Naan", price: 50 },
            { name: "Roti", price: 10 },
            { name: "Paratha", price: 50 },
            { name: "Biryani", price: 560 },
            { name: "Fish Curry", price: 220 },
            { name: "Mutton Curry", price: 220 },
        ]
      },
      {
        stop: "palakkad",
        hotelName: "Southern state Hotel",
        address: "Palakkad, Kerala",
        foodItems: [
          { name: "Thalappakatti", price: 150 },
          { name: "Parotta", price: 50 },
          { name: "Chicken Curry", price: 250 },
          { name: "Naan", price: 40 },
        ]
      },
    {
      stop: "Salem",
      hotelName: "west Hotel",
      address: "Goat road, Tamil Nadu",
      foodItems: [
        { name: "Salem Special", price: 120 },
        { name: "Dosai", price: 50 },        
        { name: "Chicken Curry", price: 150 },
        { name: "Naan", price: 50 },
          { name: "Roti", price: 10 },
          { name: "Paratha", price: 50 },
          { name: "Biryani", price: 560 },
          { name: "Fish Curry", price: 220 },
          { name: "Mutton Curry", price: 220 },
      ]
    },
    {
        stop: "Salem",
        hotelName: "Brilliant Hotel",
        address: "Salem to coimbatore Road, Tamil Nadu",
        foodItems: [
          { name: "Salem Special", price: 120 },
          { name: "Dosai", price: 50 },
          { name: "Chicken Curry", price: 250 },
          { name: "Naan", price: 40 },
        ]
      },
      {
        stop: "Salem",
        hotelName: "Salem Hotel",
        address: "Salem, Tamil Nadu",
        foodItems: [
          { name: "Salem Special", price: 120 },
          { name: "Dosai", price: 50 },
          { name: "Paneer Tikka", price: 180 },
          { name: "Chicken Tikka", price: 200 },
          { name: "Mutton Biryani", price: 240 },
          { name: "Roti", price: 20 },
        ]
      },
    {
      stop: "coimbatore",
      hotelName: "Coimbatore Comfort",
      address: "L&T bypass, Coimbatore",
      foodItems: [
        { name: "Kothu Parotta", price: 150 },
        { name: "Idli Vada", price: 60 },
        { name: "Chicken Curry", price: 150 },
        { name: "Naan", price: 50 },
          { name: "Roti", price: 10 },
          { name: "Paratha", price: 50 },
          { name: "Biryani", price: 560 },
          { name: "Fish Curry", price: 220 },
          { name: "Mutton Curry", price: 220 },
      ]
    },    {
        stop: "coimbatore",
        hotelName: "Trial Restaurant",
        address: "Somanur, Coimbatore",
        foodItems: [
          { name: "Kothu Parotta", price: 150 },
          { name: "Idli Vada", price: 60 },
          { name: "Chicken Curry", price: 150 },
          { name: "Naan", price: 50 },
            { name: "Roti", price: 10 },
            { name: "Paratha", price: 50 },
            { name: "Biryani", price: 560 },
            { name: "Fish Curry", price: 220 },
            { name: "Mutton Curry", price: 220 },
        ]
      },    {
        stop: "coimbatore",
        hotelName: "Paraside Hotel",
        address: "L&T Bypass, Coimbatore",
        foodItems: [
          { name: "Kothu Parotta", price: 150 },
          { name: "Idli Vada", price: 60 },
          { name: "Paneer Tikka", price: 180 },
          { name: "Chicken Tikka", price: 200 },
          { name: "Mutton Biryani", price: 240 },
          { name: "Roti", price: 20 },
        ]
      },
  ];

Hotel.insertMany(sampleHotels)
  .then(() => {
    console.log("Sample hotels inserted successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log("Error inserting hotels:", err);
    mongoose.connection.close();
  });
