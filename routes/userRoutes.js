// routes/userRoutes.js
const express = require("express"); // CHANGE HERE
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  logoutUser,
  updateUserProfile,
} = require("../controllers/userController.js"); // CHANGE HERE
const { protect } = require("../middleware/authMiddleware.js");

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/logout", logoutUser);
// Add this line. The 'protect' middleware will run first.
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router; // CHANGE HERE
