const User = require("../models/User");

// CREATE user (signup)
const createUser = async (req, res) => {
  try {

    const newUser = new User(req.body);
    await newUser.save();

    res.json({
      message: "User created",
      user: newUser
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// LOGIN user
const loginUser = async (req, res) => {

  const { email, password, role } = req.body;

  const user = await User.findOne({
    email: email,
    password: password,
    role: role
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials"
    });
  }

  res.json({
    message: "Login successful",
    user: user
  });

};


// READ all users
const getUsers = async (req, res) => {

  const users = await User.find();

  res.json(users);

};


// UPDATE user
const updateUser = async (req, res) => {

  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(user);

};


// DELETE user
const deleteUser = async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted"
  });

};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser
};