const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./src/routes/UserRoutes");

const app = express();

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // allow your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/alumni_connect")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", userRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started at port ${PORT}`);
});
