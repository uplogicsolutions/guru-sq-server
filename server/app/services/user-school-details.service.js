const db = require("../models");
const UserSchoolDetailsModel = db.userSchoolDetails;

exports.createUserSchoolDetails = async (data) => {
    const response = UserSchoolDetailsModel.create(data);
    return response;
}