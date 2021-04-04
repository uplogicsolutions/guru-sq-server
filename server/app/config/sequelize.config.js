const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const fs = require('fs');
var path = require("path");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;