const express = require("express");
const connectDB = require("./src/db/db");

const app = express();

connectDB();

app.use(express.json());

app.use("/api", require("./src/routes/UserRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});