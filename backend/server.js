// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const alumniRoutes = require("./src/app");


// const connectDB = require("./src/db/db");
// const userRoutes = require("./src/routes/auth_Routes");
//  const alumniApp = require("./src/app");

//  const app = express(); // ✅ FIRST create app

//  app.use(cors());
//  app.use(express.json());

//  connectDB();

// // ✅ NOW use routes
//  app.use("/", alumniApp);
// app.use("/api/auth", authRoutes);

// app.listen(8001, () => console.log("Server running"));
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./src/db/db");
const authRoutes = require("./src/routes/auth_Routes.js");
const alumniApp = require("./src/app");

const app = express(); // ✅ FIRST create app

app.use(cors());
app.use(express.json());

connectDB();

// ✅ NOW use routes
app.use("/", alumniApp);
 app.use("/api/auth", authRoutes);

app.listen(8001, () => console.log("Server running"));