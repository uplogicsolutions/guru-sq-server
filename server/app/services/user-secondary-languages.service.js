const db = require("../models");
const UserSecondaryLanguagesModel = db.userSecondaryLanguages;

exports.createUserSecondaryLanguages = async (data) => {
    const response = UserSecondaryLanguagesModel.create(data);
    return response;
}