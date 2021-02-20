const db = require("../models");
const UserJobSupplementarySubjectsModel = db.userJobSupplementarySubjects;

exports.createUserJobSupplementarySubjects = async (data) => {
    const response = UserJobSupplementarySubjectsModel.create(data);
    return response;
}