// controllers/userController.js
const asyncHandler = require("express-async-handler"); // CHANGE HERE
const User = require("../models/userModel.js"); // CHANGE HERE
const generateToken = require("../utils/generateToken.js"); // CHANGE HERE

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400); // Bad Request
    throw new Error("User already exists");
  }

  // Create new user (password is automatically hashed by the pre-save hook)
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Find the user by email
  const user = await User.findOne({ email });

  // 2. If user exists AND the password matches
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id); // Generate and send the cookie

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401); // Unauthorized
    throw new Error("Invalid email or password");
  }
});

// Don't forget to export the new function
module.exports = { registerUser, authUser };
