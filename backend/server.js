const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/db/db");
const userRoutes = require("./src/routes/UserRoutes");
const alumniApp = require("./src/app");

const app = express(); // ✅ FIRST create app

app.use(cors());
app.use(express.json());

connectDB();

// ✅ NOW use routes
app.use("/", alumniApp);
app.use("/auth", userRoutes);

app.listen(8001, () => console.log("Server running"));