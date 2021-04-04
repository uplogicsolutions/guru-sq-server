const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const fs = require('fs');
var path = require("path");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(path.resolve(__dirname,'../certs/BaltimoreCyberTrustRoot.crt.pem'))
    }
  }
});

module.exports = sequelize;