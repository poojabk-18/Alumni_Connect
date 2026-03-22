const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = require('./src/app') 

app.use(cors());

const connectDB = require("./src/db/db");
const userRoutes = require("./src/routes/UserRoutes");





app.use(express.json());

connectDB();



app.use("/auth", userRoutes);

app.listen(8001, () => console.log("Server running at port 8001"));