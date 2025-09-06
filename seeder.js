const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load models and data
const Product = require("./models/productModel");
const products = require("./data/products");

// Load env vars
dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear everything first
    await Product.deleteMany();

    // Insert the sample data
    await Product.insertMany(products);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check for a command line argument to decide which function to run
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
