const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/db/db");
const userRoutes = require("./src/routes/UserRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", userRoutes);

app.listen(8001, () => console.log("Server running"));