const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const unkownEndPoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.info(error.message);
  res.status(400).json({ error: error.message });
};

module.exports = { requestLogger, unkownEndPoint, errorHandler };
