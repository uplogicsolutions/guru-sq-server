const db = require("../models");
const TokenBlacklist = db.tokenBlacklist;

exports.addBlacklistedToken = async (data) => {
    await TokenBlacklist.create({
        token: data.token
    });
}

exports.deleteBlacklistedToken = async (data) => {
    await TokenBlacklist.destroy({
        where: { token: data.token }
    });
}

exports.checkValidity = async (data) => {
    const response = await TokenBlacklist.findOne({where: {token: data.token}});
    if(response && response.token) {
        return false;
    }
    return true;
}
