const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Default error
  let error = {
    statusCode: 500,
    message: 'Internal Server Error'
  };

  // Validation error
  if (err.name === 'ValidationError') {
    error.statusCode = 400;
    error.message = err.message;
  }

  // Cast error
  if (err.name === 'CastError') {
    error.statusCode = 400;
    error.message = 'Invalid ID format';
  }

  res.status(error.statusCode).json({
    error: error.message,
    timestamp: new Date().toISOString(),
    path: req.path
  });
};

module.exports = errorHandler;

