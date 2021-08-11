const { logger } = require('../utils/logger');

const errorMiddleware = (error, req, res, next) => {
  try {
    const code = error.code || 500;
    const message = error.message || 'Something went wrong';
    const status = error.status || 'BAD_REQUEST';
    const data = error.data || {};

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${code}, Message:: ${message}`);
    res.status(code).json({ message, status, data });
  } catch (error) {
    next(error);
  }
};

module.exports = errorMiddleware;
