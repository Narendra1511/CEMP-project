const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { connectDB } = require("./database/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", require("./api/authApi"));
app.use("/api/events", require("./api/eventApi"));
app.use("/api/registrations", require("./api/registrationApi"));

// Serve React frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});