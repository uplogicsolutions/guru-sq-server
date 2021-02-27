const db = require("../models");
const UserCoreSubjectsModel = db.userCoreSubjects;
const UserGuidanceSubjectsModel = db.userGuidanceSubjects;
const UserImprovementSubjectsModel = db.userImprovementSubjects;

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: '0'
});

exports.createUserSubjects = async (data, user_id) => {
    data.core_subjects.map((subject) => subject.user_id = user_id);
    data.improvement_subjects.map((subject) => subject.user_id = user_id);
    data.guidance_subjects.map((subject) => subject.user_id = user_id);
    const result = await sequelize.transaction(async (t) => {
        await UserCoreSubjectsModel.bulkCreate(data.core_subjects, { transaction: t });
        await UserGuidanceSubjectsModel.bulkCreate(data.guidance_subjects, { transaction: t });
        await UserImprovementSubjectsModel.bulkCreate(data.improvement_subjects, { transaction: t });
    });
    return result;
}
