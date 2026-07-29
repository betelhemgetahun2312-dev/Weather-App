const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`${status} - ${message}`, `${req.method} ${req.originalUrl}`);

  res.status(status).json({
    success: false,
    error: { status, message },
  });
};

module.exports = errorHandler;
