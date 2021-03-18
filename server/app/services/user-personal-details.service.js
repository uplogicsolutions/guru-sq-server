const db = require("../models");
const UserSecondaryLanguagesModel = db.userSecondaryLanguages;
const UserPersonalDetailsModel = db.userPersonalDetails;

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: '0'
});

exports.getUserPersonalDetails = async (user_id) => {
    let response = await UserPersonalDetailsModel.findOne({ where: { user_id: user_id } });
    return response;
}

exports.createUserPersonalDetails = async (data) => {
    data.secondary_languages.map((value) => value.user_id = data.user_id);
    const result = await sequelize.transaction(async (t) => {
        let response = await UserPersonalDetailsModel.create(data, { transaction: t });
        let response2 = await UserSecondaryLanguagesModel.bulkCreate(data.secondary_languages, { transaction: t });
        response = response.get();
        response.secondary_languages = [];
        response2.map((value) => response.secondary_languages.push(value.get()));
        return response;
    });
    return result;

}

exports.editUserPersonalDetails = async (data) => {
    let num = await UserPersonalDetailsModel.update(data, { where: { user_id: data.user_id } })
    if (num == 1) {
        return true;
    }
    return false;
}

exports.editUserSecondaryLanguages = async (data) => {
    for (let currentLanguage of data.remove) {
        await UserSecondaryLanguagesModel.destroy({
            where: {
                user_id: data.user_id,
                language_id: currentLanguage
            }
        })
    }

    for (let currentLanguage of data.data) {
        let record = await UserSecondaryLanguagesModel.findOne({
            where: {
                user_id: data.user_id,
                language_id: currentLanguage.language_id
            }
        });
        if (record) {
            record.proficiency = currentLanguage.proficiency;
            record.save();
        } else {
            currentLanguage.user_id = data.user_id;
            console.log(currentLanguage)
            await UserSecondaryLanguagesModel.create(currentLanguage);
        }
    }
}

exports.getProfile = async (user) => {
    let response = {};
    const userLogin = await db.userLogin.findOne({
        attributes: ["username", "user_id"],
        where: { user_id: user.user_id }
    });
    const userPersonalDetails = await db.userPersonalDetails.findOne({
        attributes: ["first_name", "last_name", "mobile", "email", "photo_url", "gender", "dob"],
        where: { user_id: user.user_id }
    });
    const userCoreSubjects = await db.userCoreSubjects.findAll({
        attributes: ["subject_id"],
        where: { user_id: user.user_id }
    });
    let coreSubjects = [];
    userCoreSubjects.map( (subject) => coreSubjects.push(subject.subject_id));
    const userGuidanceSubjects = await db.userGuidanceSubjects.findAll({
        attributes: ["subject_id"],
        where: { user_id: user.user_id }
    });
    let guidanceSubjects = [];
    userGuidanceSubjects.map( (subject) => guidanceSubjects.push(subject.subject_id));
    const userImprovementSubjects = await db.userImprovementSubjects.findAll({
        attributes: ["subject_id"],
        where: { user_id: user.user_id }
    });
    let improvementSubjects = [];
    userImprovementSubjects.map( (subject) => improvementSubjects.push(subject.subject_id));
    response = {
        ...userLogin.dataValues,
        ...userPersonalDetails.dataValues,
        core_subjects: coreSubjects,
        guidance_subjects: guidanceSubjects,
        improvement_subjects: improvementSubjects
    }

    return response;
}