const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");
const fs = require('fs');
var path = require("path");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: 'mysql80-afe9.euw2.cloud.ametnes.com',
  port: 3316,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(path.resolve(__dirname, '../certs/BaltimoreCyberTrustRoot.crt.pem'))
    }
  }
});

module.exports = sequelize;