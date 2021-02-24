const AuthService = require('../services/auth.service');
const Sequelize = require('sequelize');
const CustomError = require("../utils/customError");

exports.signup = async (req, res) => {
    try {
        const response = await AuthService.signup(req.body);
        res.send(response);
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Validation error."
            });
        } else if (error instanceof Sequelize.ValidationError) {
            let currentUserError = error.get('user_login.username');
            if (currentUserError.length > 0 && currentUserError[0].type == 'unique violation') {
                res.status(400).send({
                    message: "User already exist."
                });
            } else {
                res.status(400).send({
                    message:
                        error.message || "Validation error.."
                });
            }
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong while creating the User."
            });
        }
    }
}

exports.signin = async (req, res) => {
    try {
        const response = await AuthService.signin(req.body);
        res.send(response);
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Invalid credentials"
            });
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong."
            });
        }
    }
}

exports.signout = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const response = await AuthService.signout(token);
        res.send(response);
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some went wrong."
        });
    }
}
