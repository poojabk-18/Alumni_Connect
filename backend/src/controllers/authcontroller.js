const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Models/auth_model.js");


// ✅ REGISTER (SIGN UP)
const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = new User({
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "User registered successfully 🎉",
      token,
      user: {
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
};


// ✅ LOGIN (SIGN IN)
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ",
      token,
      user: {
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login error" });
  }
};


// ✅ VERY IMPORTANT EXPORT
module.exports = {
  registerUser,
  loginUser
};