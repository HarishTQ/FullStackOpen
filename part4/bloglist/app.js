const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const blogRouter = require("./controllers/blog");

mongoose.connect(config.MONGO_URI).then((result) => logger.info("connected"));

app.use(cors());
app.use(express.json());
//app.use(middleware.requestLogger);
app.use(morgan("short"));
app.use("/api/blogs", blogRouter);
app.use(middleware.errorHandler);
app.use(middleware.unkownEndPoint);

module.exports = app;
