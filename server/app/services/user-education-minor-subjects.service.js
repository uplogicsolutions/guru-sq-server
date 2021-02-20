const db = require("../models");
const UserEducationMinorSubjectsModel = db.userEducationMinorSubjects;

exports.createUserEducationMinorSubjects = async (data) => {
    const response = UserEducationMinorSubjectsModel.create(data);
    return response;
}