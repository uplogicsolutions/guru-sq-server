const db = require("../models");
const UserCoreSubjectsModel = db.userCoreSubjects;
const UserGuidanceSubjectsModel = db.userGuidanceSubjects;
const UserImprovementSubjectsModel = db.userImprovementSubjects;
const sequelize = require("../config/sequelize.config");

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

exports.getUserSubjects = async (user_id) => {
    let coreSubjects = await UserCoreSubjectsModel.findAll({
        where: {
            user_id: user_id,
        }
    });
    let improvementSubjects = await UserImprovementSubjectsModel.findAll({
        where: {
            user_id: user_id,
        }
    });
    let guidanceSubjects = await UserGuidanceSubjectsModel.findAll({
        where: {
            user_id: user_id,
        }
    });
    return {
        core_subjects: coreSubjects,
        improvement_subjects: improvementSubjects,
        guidance_subjects: guidanceSubjects,
    }
}

exports.editUserSubjects = async (data) => {
    await UserCoreSubjectsModel.destroy({
        where: {
            user_id: data.user_id
        }
    });
    data.core_subjects.map(async (subject) => {
        subject.user_id = data.user_id;
        await UserCoreSubjectsModel.create(subject);
    });
    await UserGuidanceSubjectsModel.destroy({
        where: {
            user_id: data.user_id
        }
    });
    data.guidance_subjects.map(async (subject) => {
        subject.user_id = data.user_id;
        await UserGuidanceSubjectsModel.create(subject);
    });
    await UserImprovementSubjectsModel.destroy({
        where: {
            user_id: data.user_id
        }
    });
    data.improvement_subjects.map(async (subject) => {
        subject.user_id = data.user_id;
        await UserImprovementSubjectsModel.create(subject);
    });
}
