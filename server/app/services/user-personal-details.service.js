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
    for(let currentLanguage of data.remove) {
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