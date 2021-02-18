const jwt = require("jsonwebtoken");
const db = require("../models");
const TokenBlacklistService = require('../services/token-blacklist.service');
const User = db.userLogin;
const CustomError = require("../utils/customError");

exports.signup = async (data) => {
    if (!data.username || !data.password) {
        throw new CustomError("All fields are required.");
    }
    const response = await User.create({
        username: data.username,
        password: data.password
    });
    return response;
}

exports.signin = async (data) => {
    const user = await User.findOne({where: {username: data.username, password: data.password}});
    if(user && user.username && user.id) {
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { 
                expiresIn: '2 days' 
            }
        );
        return {
            user: {
                id: user.id,
                username: user.username
            },
            token: token
        };
    } else {
        const user = await User.findOne({where: {username: data.username}});
        if(user && user.username && user.id) {
            throw new CustomError("Incorrect password");
        } else {
            throw new CustomError("Invalid username");
        }
    }
}

exports.signout = async (token) => {
    await TokenBlacklistService.addBlacklistedToken({token: token});
    return {
        message: "Successfully Signed Out"
    }
}
