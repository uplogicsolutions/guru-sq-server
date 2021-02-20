const db = require("../models");
const UserPersonalDetailsModel = db.userPersonalDetails;

exports.createUserPersonalDetails = async (data) => {
    const response = UserPersonalDetailsModel.create(data);
    return response;
}