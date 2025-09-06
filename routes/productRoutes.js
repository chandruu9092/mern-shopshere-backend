// In routes/productRoutes.js
const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

// Instead of writing the function here, we just point to the controller function
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

module.exports = router;
