const express = require("express");
const router = express.Router();

const {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser
} = require("../controllers/Usercontroller");

router.post("/signup", createUser);
router.post("/login", loginUser);

router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;