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

exports.editUserCoreSubjects = async (data) => {
    for(let currentSubject of data.remove) {
        await UserCoreSubjectsModel.destroy({
            where: {
                user_id: data.user_id, 
                subject_id: currentSubject
            }
        })
    }
    for (let currentSubject of data.data) {
        let record = await UserCoreSubjectsModel.findOne({
            where: { 
                user_id: data.user_id, 
                subject_id: currentSubject.subject_id 
            }
        });
        if (!record) {
            currentSubject.user_id = data.user_id;
            await UserCoreSubjectsModel.create(currentSubject);
        }
    }
}

exports.editUserGuidanceSubjects = async (data) => {
    for(let currentSubject of data.remove) {
        await UserGuidanceSubjectsModel.destroy({
            where: {
                user_id: data.user_id, 
                subject_id: currentSubject
            }
        })
    }
    for (let currentSubject of data.data) {
        let record = await UserGuidanceSubjectsModel.findOne({
            where: { 
                user_id: data.user_id, 
                subject_id: currentSubject.subject_id 
            }
        });
        if (!record) {
            currentSubject.user_id = data.user_id;
            await UserGuidanceSubjectsModel.create(currentSubject);
        }
    }
}

exports.editUserImprovementSubjects = async (data) => {
    for(let currentSubject of data.remove) {
        await UserImprovementSubjectsModel.destroy({
            where: {
                user_id: data.user_id, 
                subject_id: currentSubject
            }
        })
    }
    for (let currentSubject of data.data) {
        let record = await UserImprovementSubjectsModel.findOne({
            where: { 
                user_id: data.user_id, 
                subject_id: currentSubject.subject_id 
            }
        });
        if (!record) {
            currentSubject.user_id = data.user_id;
            await UserImprovementSubjectsModel.create(currentSubject);
        }
    }
}
