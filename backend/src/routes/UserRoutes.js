const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require("../controllers/Usercontroller");

// CREATE
router.post("/users", createUser);

// READ
router.get("/users", getUsers);

// UPDATE
router.put("/users/:id", updateUser);

// DELETE
router.delete("/users/:id", deleteUser);

module.exports = router;