const db = require("../models");
const UserProfessionalDetailsModel = db.userProfessionalDetails;

exports.createUserProfessionalDetails = async (data) => {
    const response = UserProfessionalDetailsModel.create(data);
    return response;
}