const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} request to ${url}`);
  next();
};

module.exports = logger;
