const dotenv = require("dotenv");

dotenv.config();

const env = {
  TOKEN_KEY: process.env.TOKEN_KEY,
};

module.exports = env;
