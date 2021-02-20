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
db.schoolTypes = require("./school-types.model")(sequelize, Sequelize);
db.schoolBoardTypes = require("./school-board-types.model")(sequelize, Sequelize);
db.teachingLicenses = require("./teaching-licenses.model")(sequelize, Sequelize);
db.mediumOfInstructions = require("./medium-of-instructions.model")(sequelize, Sequelize);
db.userSchoolDetails = require("./user-school-details.model")(sequelize, Sequelize);
db.subjects = require("./subjects.model")(sequelize, Sequelize);
db.userCoreSubjects = require("./user-core-subjects.model")(sequelize, Sequelize);
db.userGuidanceSubjects = require("./user-guidance-subjects.model")(sequelize, Sequelize);
db.userImprovementSubjects = require("./user-improvement-subjects.model")(sequelize, Sequelize);
db.passingGrades = require("./passing-grades.model")(sequelize, Sequelize);

module.exports = db;