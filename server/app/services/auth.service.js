const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const db = require("../models");
const TokenBlacklistService = require('../services/token-blacklist.service');
const User = db.userLogin;
const UserPersonalDetails = db.userPersonalDetails;
const UserSchoolDetails = db.userSchoolDetails;
const UserSubjects = db.userCoreSubjects;
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
            let response = await exports.checkUser(user);
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
                ...response,
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

exports.checkUser = async (user) => {
    let response = {};
    const userLogin = await User.findOne({ where: { username: user.username } });
    if (userLogin && userLogin.user_id) {
        const userPersonalDetails = await UserPersonalDetails.findOne({ where: { user_id: user.user_id } });
        if (userPersonalDetails && userPersonalDetails.user_id) {
            response = {
                user: {
                    user_id: userLogin.user_id,
                    username: userLogin.username,
                    first_name: userPersonalDetails.first_name,
                    last_name: userPersonalDetails.last_name,
                    mobile: userPersonalDetails.mobile,
                    email: userPersonalDetails.email,
                    photo_url: userPersonalDetails.photo_url
                }
            }
            let userSchoolDetails = await UserSchoolDetails.findOne({ where: { user_id: user.user_id } });
            if (userSchoolDetails && userSchoolDetails.user_id) {
                let userCoreSubjects = await UserSubjects.findOne({ where: { user_id: user.user_id } });
                if(userCoreSubjects && userCoreSubjects.user_id) {
                    response = {
                        ...response,
                        isLoggedIn: true,
                        redirectUrl: '/home'
                    }
                } else {
                    return {
                        ...response,
                        isLoggedIn: true,
                        redirectUrl: '/subjects'
                    }
                }
            } else {
                return {
                    ...response,
                    isLoggedIn: true,
                    redirectUrl: '/school-teacher'
                }
            }
        } else {
            return {
                user: null,
                isLoggedIn: true,
                redirectUrl: '/personal-details'
            }
        }
    } else {
        return {
            isLoggedIn: false,
            redirectUrl: '/login'
        }
    }
    return response;
}
