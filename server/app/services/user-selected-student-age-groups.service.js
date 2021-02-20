const db = require("../models");
const UserSelectedStudentAgeGroupsModel = db.userSelecetedStudentAgeGroups;

exports.createUserSelectedStudentAgeGroups = async (data) => {
    const response = UserSelectedStudentAgeGroupsModel.create(data);
    return response;
}