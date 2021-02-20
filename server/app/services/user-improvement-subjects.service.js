const db = require("../models");
const UserImprovementSubjectsModel = db.userImprovementSubjects;

exports.createUserImprovementSubjects = async (data) => {
    const response = UserImprovementSubjectsModel.create(data);
    return response;
}