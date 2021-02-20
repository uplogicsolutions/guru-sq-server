const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: '0'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.userLogin = require("./user-login.model")(sequelize, Sequelize);
db.tokenBlacklist = require("./token-blacklist.model")(sequelize, Sequelize);
db.userPersonalDetails = require("./user-personal-details.model")(sequelize, Sequelize);
db.teacherTypes = require("./teacher-types.model")(sequelize, Sequelize);
db.languages = require("./languages.model")(sequelize, Sequelize);

module.exports = db;