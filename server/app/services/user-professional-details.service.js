const db = require("../models");
const UserProfessionalDetailsModel = db.userProfessionalDetails;
const UserJobCoreSubjectsModel = db.userJobCoreSubjects;
const UserJobSupplementarySubjectsModel = db.userJobSupplementarySubjects;
const UserSelectedStudentAgeGroupsModel = db.userSelecetedStudentAgeGroups;

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: '0'
});

exports.createUserProfessionalDetails = async (data) => {
    let core_subjects = [];
    data.core_subjects.map((value) => core_subjects.push({user_id: data.user_id, subject_id: value}));
    let supplementary_subjects = [];
    data.supplementary_subjects.map((value) => supplementary_subjects.push({user_id: data.user_id, subject_id: value}));
    let selected_age_groups = [];
    data.selected_age_groups.map((value) => selected_age_groups.push({user_id: data.user_id, group_id: value}));
    const result = await sequelize.transaction(async (t) => {
        let response1 = await UserJobCoreSubjectsModel.bulkCreate(core_subjects, { transaction: t });
        let response2 = await UserJobSupplementarySubjectsModel.bulkCreate(supplementary_subjects, { transaction: t });
        let response3 = await UserSelectedStudentAgeGroupsModel.bulkCreate(selected_age_groups, { transaction: t });
        let response = await UserProfessionalDetailsModel.create(data, { transaction: t });
        response = response.get();
        response.major_subjects = [];
        response1.map((value) => response.major_subjects.push(value.get()));
        response.minor_subjects = [];
        response2.map((value) => response.minor_subjects.push(value.get()));
        response.selected_age_groups = [];
        response3.map((value) => response.selected_age_groups.push(value.get()));
        return response;
    });
    return result;
}