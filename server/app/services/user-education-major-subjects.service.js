const db = require("../models");
const UserEducationMajorSubjectsModel = db.userEducationMajorSubjects;

exports.createUserEducationMajorSubjects = async (data) => {
    const response = UserEducationMajorSubjectsModel.create(data);
    return response;
}