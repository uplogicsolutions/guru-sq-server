const db = require("../models");
const UserGuidanceSubjectsModel = db.userGuidanceSubjects;

exports.createUserGuidanceSubjects = async (data) => {
    const response = UserGuidanceSubjectsModel.create(data);
    return response;
}