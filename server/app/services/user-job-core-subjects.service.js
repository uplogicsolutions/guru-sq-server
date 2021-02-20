const db = require("../models");
const UserJobCoreSubjectsModel = db.userJobCoreSubjects;

exports.createJobCoreSubjects = async (data) => {
    const response = UserJobCoreSubjectsModel.create(data);
    return response;
}