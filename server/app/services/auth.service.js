const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const db = require("../models");
const TokenBlacklistService = require('../services/token-blacklist.service');
const User = db.userLogin;
const CustomError = require("../utils/customError");

exports.signup = async (data) => {
    if (!data.username || !data.password) {
        throw new CustomError("All fields are required.");
    }
    // const hash = await bcrypt.hashSync(data.password, 10);
    const user = await User.create({
        username: data.username,
        password: data.password
    });
    if (user && user.username && user.user_id) {
        const token = jwt.sign(
            {
                user_id: user.user_id,
                username: user.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '2 days'
            }
        );
        return {
            user: {
                user_id: user.user_id,
                username: user.username
            },
            token: token
        };
    }
    return response;
}

exports.signin = async (data) => {
    const user = await User.findOne({ where: { username: data.username } });
    if (user && user.username && user.user_id) {
        // const valid = await bcrypt.compareSync(data.password, user.password);
        if (user.password == data.password) {
            const token = jwt.sign(
                {
                    user_id: user.user_id,
                    username: user.username
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '2 days'
                }
            );
            return {
                user: {
                    user_id: user.user_id,
                    username: user.username
                },
                token: token
            };
        }
        throw new CustomError("Incorrect password");
    }
    throw new CustomError("Invalid username");
}

exports.signout = async (token) => {
    await TokenBlacklistService.addBlacklistedToken({ token: token });
    return {
        message: "Successfully Signed Out"
    }
}
