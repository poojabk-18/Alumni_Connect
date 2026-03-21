const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/Usercontroller");

router.post("/login", loginUser);

module.exports = router;