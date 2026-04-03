const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const recordRoutes = require("./routes/recordRoutes.js");
const summaryRoutes = require("./routes/summaryRoutes.js");

connectDB;
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
// Test Route
app.use("/api/summary", summaryRoutes);
app.use("/api/records", recordRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});