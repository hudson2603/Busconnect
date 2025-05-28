const mongoose = require('mongoose');
const PickupDrop = require('./models/PickupDrop');  // Import the model
require('dotenv').config();  // Load .env variables if needed

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bc_db', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Connection Error:", err));

// Sample Data
const sampleData = [
  { pickup: "jaipur", drop: "Chennai", stops: ["Bangalore"] },
  { pickup: "jaipur", drop: "coimbatore", stops: ["Bangalore"] },
  { pickup: "jaipur", drop: "ahmedabad", stops: ["Mumbai"] },
  { pickup: "jaipur", drop: "lucknow", stops: ["Delhi"] },
  { pickup: "jaipur", drop: "chandigarh", stops: ["Manali"] },
  { pickup: "jaipur", drop: "goa", stops: ["Mangaluru"] },
  { pickup: "jaipur", drop: "Kochi", stops: ["Wayanad"] },
  { pickup: "jaipur", drop: "Indore", stops: ["Agra"] },
  { pickup: "jaipur", drop: "vizag", stops: ["Hyderabad"] },
  { pickup: "jaipur", drop: "Agra", stops: ["Delhi"] },
  { pickup: "jaipur", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "jaipur", drop: "Mysuru", stops: ["Hyderabad"] },
  
  { pickup: "lucknow", drop: "Chennai", stops: ["Bangalore"] },
  { pickup: "lucknow", drop: "coimbatore", stops: ["Bangalore"] },
  { pickup: "lucknow", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "lucknow", drop: "chandigarh", stops: ["Manali"] },
  { pickup: "lucknow", drop: "goa", stops: ["Mangaluru"] },
  { pickup: "lucknow", drop: "Kochi", stops: ["Wayanad"] },
  { pickup: "lucknow", drop: "Indore", stops: ["Agra"] },
  { pickup: "lucknow", drop: "vizag", stops: ["Hyderabad"] },
  { pickup: "lucknow", drop: "Agra", stops: ["Delhi"] },
  { pickup: "lucknow", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "lucknow", drop: "Mysuru", stops: ["Hyderabad"] },

  { pickup: "goa", drop: "Chennai", stops: ["Bangalore"] },
  { pickup: "goa", drop: "coimbatore", stops: ["Kochi"] },
  { pickup: "goa", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "goa", drop: "chandigarh", stops: ["Manali"] },
  { pickup: "goa", drop: "lucknow", stops: ["Mangaluru"] },
  { pickup: "goa", drop: "Kochi", stops: ["Wayanad"] },
  { pickup: "goa", drop: "Indore", stops: ["Agra"] },
  { pickup: "goa", drop: "vizag", stops: ["Hyderabad"] },
  { pickup: "goa", drop: "Agra", stops: ["Delhi"] },
  { pickup: "goa", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "goa", drop: "Mysuru", stops: ["Chikmangaluru"] },

  { pickup: "chandigarh", drop: "Chennai", stops: ["Bangalore"] },
  { pickup: "chandigarh", drop: "coimbatore", stops: ["Kochi"] },
  { pickup: "chandigarh", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "chandigarh", drop: "goa", stops: ["Manali"] },
  { pickup: "chandigarh", drop: "lucknow", stops: ["Mangaluru"] },
  { pickup: "chandigarh", drop: "Kochi", stops: ["Wayanad"] },
  { pickup: "chandigarh", drop: "Indore", stops: ["Agra"] },
  { pickup: "chandigarh", drop: "vizag", stops: ["Hyderabad"] },
  { pickup: "chandigarh", drop: "Agra", stops: ["Delhi"] },
  { pickup: "chandigarh", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "chandigarh", drop: "Mysuru", stops: ["Chikmangaluru"] },

  { pickup: "Indore", drop: "Chennai", stops: ["Bangalore"] },
  { pickup: "Indore", drop: "coimbatore", stops: ["Kochi"] },
  { pickup: "Indore", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "Indore", drop: "goa", stops: ["Manali"] },
  { pickup: "Indore", drop: "lucknow", stops: ["Mangaluru"] },
  { pickup: "Indore", drop: "Kochi", stops: ["Wayanad"] },
  { pickup: "Indore", drop: "chandigarh", stops: ["Agra"] },
  { pickup: "Indore", drop: "vizag", stops: ["Hyderabad"] },
  { pickup: "Indore", drop: "Agra", stops: ["Delhi"] },
  { pickup: "Indore", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "Indore", drop: "Mysuru", stops: ["Chikmangaluru"] },

  { pickup: "Kochi", drop: "Chennai", stops: ["Bangalore"] },
  { pickup: "Kochi", drop: "coimbatore", stops: ["palakkad"] },
  { pickup: "Kochi", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "Kochi", drop: "goa", stops: ["Manali"] },
  { pickup: "Kochi", drop: "lucknow", stops: ["mumbai"] },
  { pickup: "Kochi", drop: "Indore", stops: ["Pune"] },
  { pickup: "Kochi", drop: "chandigarh", stops: ["Agra"] },
  { pickup: "Kochi", drop: "vizag", stops: ["Hyderabad"] },
  { pickup: "Kochi", drop: "Agra", stops: ["Delhi"] },
  { pickup: "Kochi", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "Kochi", drop: "Mysuru", stops: ["Chikmangaluru"] }, 
  
  { pickup: "Agra", drop: "Chennai", stops: ["Bangalore"] },
  { pickup: "Agra", drop: "coimbatore", stops: ["Kochi"] },
  { pickup: "Agra", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "Agra", drop: "goa", stops: ["Manali"] },
  { pickup: "Agra", drop: "lucknow", stops: ["mumbai"] },
  { pickup: "Agra", drop: "Indore", stops: ["Pune"] },
  { pickup: "Agra", drop: "chandigarh", stops: ["pune"] },
  { pickup: "Agra", drop: "vizag", stops: ["Hyderabad"] },
  { pickup: "Agra", drop: "Kochi", stops: ["Pune"] },
  { pickup: "Agra", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "Agra", drop: "Mysuru", stops: ["Chikmangaluru"] },

  { pickup: "vizag", drop: "Chennai", stops: ["Bangalore"] },
  { pickup: "vizag", drop: "coimbatore", stops: ["Kochi"] },
  { pickup: "vizag", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "vizag", drop: "goa", stops: ["Manali"] },
  { pickup: "vizag", drop: "lucknow", stops: ["mumbai"] },
  { pickup: "vizag", drop: "Indore", stops: ["Pune"] },
  { pickup: "vizag", drop: "chandigarh", stops: ["pune"] },
  { pickup: "vizag", drop: "Agra", stops: ["Hyderabad"] },
  { pickup: "vizag", drop: "Kochi", stops: ["Pune"] },
  { pickup: "vizag", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "vizag", drop: "Mysuru", stops: ["Chikmangaluru"] },

  { pickup: "Mysuru", drop: "Chennai", stops: ["Bangalore"] },
  { pickup: "Mysuru", drop: "coimbatore", stops: ["Kochi"] },
  { pickup: "Mysuru", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "Mysuru", drop: "goa", stops: ["Manali"] },
  { pickup: "Mysuru", drop: "lucknow", stops: ["mumbai"] },
  { pickup: "Mysuru", drop: "Indore", stops: ["Pune"] },
  { pickup: "Mysuru", drop: "chandigarh", stops: ["pune"] },
  { pickup: "Mysuru", drop: "Agra", stops: ["Hyderabad"] },
  { pickup: "Mysuru", drop: "Kochi", stops: ["Pune"] },
  { pickup: "Mysuru", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "Mysuru", drop: "vizag", stops: ["Chikmangaluru"] },

  { pickup: "Trivandrum", drop: "Chennai", stops: ["coimbatore"] },
  { pickup: "Trivandrum", drop: "coimbatore", stops: ["Kochi"] },
  { pickup: "Trivandrum", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "Trivandrum", drop: "goa", stops: ["Kochi"] },
  { pickup: "Trivandrum", drop: "lucknow", stops: ["mumbai"] },
  { pickup: "Trivandrum", drop: "Indore", stops: ["Pune"] },
  { pickup: "Trivandrum", drop: "chandigarh", stops: ["pune"] },
  { pickup: "Trivandrum", drop: "Agra", stops: ["Hyderabad"] },
  { pickup: "Trivandrum", drop: "Kochi", stops: ["Pune"] },
  { pickup: "Trivandrum", drop: "Mysuru", stops: ["Kochi"] },
  { pickup: "Trivandrum", drop: "vizag", stops: ["Chikmangaluru"] }, 

  { pickup: "coimbatore", drop: "Chennai", stops: ["Salem"] },
  { pickup: "coimbatore", drop: "Trivandrum", stops: ["Kochi"] },
  { pickup: "coimbatore", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "coimbatore", drop: "goa", stops: ["Kochi"] },
  { pickup: "coimbatore", drop: "lucknow", stops: ["mumbai"] },
  { pickup: "coimbatore", drop: "Indore", stops: ["Pune"] },
  { pickup: "coimbatore", drop: "chandigarh", stops: ["pune"] },
  { pickup: "coimbatore", drop: "Agra", stops: ["Hyderabad"] },
  { pickup: "coimbatore", drop: "Kochi", stops: ["Pune"] },
  { pickup: "coimbatore", drop: "Mysuru", stops: ["Salem"] },
  { pickup: "coimbatore", drop: "vizag", stops: ["Hyderabad"] },

  { pickup: "Chennai", drop: "coimbatore", stops: ["Salem"] },
  { pickup: "Chennai", drop: "Trivandrum", stops: ["coimbatore"] },
  { pickup: "Chennai", drop: "ahmedabad", stops: ["Pune"] },
  { pickup: "Chennai", drop: "goa", stops: ["Kochi"] },
  { pickup: "Chennai", drop: "lucknow", stops: ["mumbai"] },
  { pickup: "Chennai", drop: "Indore", stops: ["Pune"] },
  { pickup: "Chennai", drop: "chandigarh", stops: ["pune"] },
  { pickup: "Chennai", drop: "Agra", stops: ["Hyderabad"] },
  { pickup: "Chennai", drop: "Kochi", stops: ["Pune"] },
  { pickup: "Chennai", drop: "Mysuru", stops: ["Salem"] },
  { pickup: "Chennai", drop: "vizag", stops: ["Hyderabad"] },

];

// Insert Data
PickupDrop.insertMany(sampleData)
  .then(() => {
    console.log("Sample data inserted successfully!");
    mongoose.connection.close(); // Close connection after insertion
  })
  .catch(err => {
    console.log("Error inserting data:", err);
    mongoose.connection.close();
  });
