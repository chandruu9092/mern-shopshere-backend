// middleware/errorMiddleware.js

// Handles requests to routes that do not exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global error handler that catches all errors thrown by the application
const errorHandler = (err, req, res, next) => {
  // Sometimes an error might come with a 200 OK status code, we want to default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Mongoose specific error for bad ObjectIds
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message: message,
    // Only show the error stack if we are not in production for security
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
