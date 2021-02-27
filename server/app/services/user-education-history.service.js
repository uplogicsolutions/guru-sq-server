const db = require("../models");
const UserEducationHistoryModel = db.userEducationHistory;
const UserEducationMajorSubjectsModel = db.userEducationMajorSubjects;
const UserEducationMinorSubjectsModel = db.userEducationMinorSubjects;

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: '0'
});

exports.createUserEducationHistory = async (data, user_id) => {
    data.educations.map((education) => education.user_id = user_id);
    let major_subjects = [];
    data.major_subjects.map((value) => major_subjects.push({user_id: user_id, subject_id: value}));
    let minor_subjects = [];
    data.minor_subjects.map((value) => minor_subjects.push({user_id: user_id, subject_id: value}));
    const result = await sequelize.transaction(async (t) => {
        let response1 = await UserEducationMajorSubjectsModel.bulkCreate(major_subjects, { transaction: t });
        let response2 = await UserEducationMinorSubjectsModel.bulkCreate(minor_subjects, { transaction: t });
        let response3 = await UserEducationHistoryModel.bulkCreate(data.educations, { transaction: t });
        let response = {};
        response.major_subjects = [];
        response1.map((value) => response.major_subjects.push(value.get()));
        response.minor_subjects = [];
        response2.map((value) => response.minor_subjects.push(value.get()));
        response.educations = [];
        response3.map((value) => response.educations.push(value.get()));
        return response;
    });
    return result;
}