const db = require("../models");
const UserCoreSubjectsModel = db.userCoreSubjects;

exports.createUserCoreSubjects = async (data) => {
    const response = UserCoreSubjectsModel.create(data);
    return response;
}