require("dotenv").config;

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bloglist";

module.exports = { PORT, MONGO_URI };
