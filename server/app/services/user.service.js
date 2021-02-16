const db = require("../models");
const User = db.users;
const CustomError = require("../utils/customError");

exports.create = async (data) => {
    if (!data.username || !data.password || !data.email || !data.mobile) {
        throw new CustomError("All fields are required.");
    }
    const response = await User.create({
        username: data.username,
        password: data.password,
        email: data.email,
        mobile: data.mobile
    })
    return response;
}

exports.findAll = async () => {
    const users = await User.findAll();
    return users;
}

exports.findById = async (id) => {
    const user = await User.findByPk(id);
    return user;
}

exports.update = async (id, data) => {
    const num = await User.update(data, {
        where: { id: id }
    });
    if (num != 1) {
        throw new CustomError("User does not exist.");
    }
}

exports.delete = async (id) => {
    const num = await User.destroy({
        where: { id: id }
    });
    if (num != 1) {
        throw new CustomError("User does not exist.");
    }
}