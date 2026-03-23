const express = require("express");
const cors = require("cors");
require("dotenv").config();

// <<<<<<< HEAD
// const app = require('./src/app') 
// =======

const authRoutes = require("./src/routes/auth_Routes.js");
const alumniApp = require("./src/app");

const app = express(); // ✅ FIRST create app


app.use(cors());

const connectDB = require("./src/db/db");






app.use(express.json());

connectDB();

// <<<<<<< HEAD


// app.use("/auth", userRoutes);
// =======
// ✅ NOW use routes
app.use("/", alumniApp);
 app.use("/api/auth", authRoutes);


app.listen(8001, () => console.log("Server running at port 8001"));