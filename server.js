// 1. Import Express
const express = require("express");
require("dotenv").config(); // Load environment variables
const connectDB = require("./config/db"); // Import DB connection
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");

// Connect to Database
connectDB();

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes"); // CHANGE HERE

// 2. Initialize the Express app
const app = express();

// 3. Define a Port
const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser()); // Add this line

// 4. Create a basic route (the waiter's rule)
// This tells the server what to do when someone visits the main URL ('/')
app.get("/", (req, res) => {
  res.send("Welcome to the ShopSphere backend API! 🛍️");
});

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// 404 Not Found Middleware (must be after API routes)
app.use(notFound);

// Global Error Handler (must be the last middleware)
app.use(errorHandler);

// 5. Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
