// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error.',
    error: err.stack,
  });
};

module.exports = errorHandler;
