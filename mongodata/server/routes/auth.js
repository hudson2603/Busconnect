const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authMiddleware");

// User Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { username,email, password } = req.body;
        // console.log("Signup Body Req", req.body);
        // console.log("Signup: email=", email, "password=", password);
        
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        // username validation
        if(!username || !email || !password){
            return res.status(400).json({messaage:"Username is required"})
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create New User
        user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.status(201).json({ message: "User registered successfully", token });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// User Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
  });
// route for profile
  router.get("/profile", authenticate, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select("-password");
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

module.exports = router;
