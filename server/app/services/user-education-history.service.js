const db = require("../models");
const UserEducationHistoryModel = db.UserEducationHistoryModel;

exports.createUserEducationHistory = async (data) => {
    const response = UserEducationHistoryModel.create(data);
    return response;
}