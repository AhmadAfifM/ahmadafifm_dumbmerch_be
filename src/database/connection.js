const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize(
  "dumbmerch_b35",
  "dumbways_db",
  "dumbmerch123",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

db.sequelize = sequelize;

module.exports = db;
