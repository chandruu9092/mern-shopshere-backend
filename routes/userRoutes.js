// routes/userRoutes.js
const express = require("express"); // CHANGE HERE
const router = express.Router();
const { registerUser, authUser } = require("../controllers/userController.js"); // CHANGE HERE

router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router; // CHANGE HERE
