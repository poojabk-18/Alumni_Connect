const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "alumni"],
    default: "student"
  }

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);