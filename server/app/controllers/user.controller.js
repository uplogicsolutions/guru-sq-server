const UserPersonalDetailsService = require('../services/user-personal-details.service');
const UserSchoolDetailsService = require('../services/user-school-details.service');
const UserSubjectsService = require('../services/user-subjects.service');
const UserEducationHistoryService = require('../services/user-education-history.service');
const UserProfessionalDetailsService = require('../services/user-professional-details.service');
const Sequelize = require('sequelize');
const CustomError = require("../utils/customError");

exports.addUserPersonalDetails = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        let response = await UserPersonalDetailsService.createUserPersonalDetails(req.body);
        res.send({
            data: response
        });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Validation error."
            });
        } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
            if (error.table == 'languages') {
                res.status(400).send({
                    message: "Invalid mother tongue."
                });
            }else if (error.table == 'teacher_types') {
                res.status(400).send({
                    message: "Invalid teacher type."
                });
            } else {
                res.status(400).send({
                    message: "Invalid user."
                });
            }
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong."
            });
        }
    }
}

exports.addUserSchoolDetails = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        const response = await UserSchoolDetailsService.createUserSchoolDetails(req.body);
        res.send({
            data: response
        });
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Validation error."
            });
        } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
            if (error.table == 'school_types') {
                res.status(400).send({
                    message: "Invalid school type."
                });
            } else if (error.table == 'teaching_licenses'){
                res.status(400).send({
                    message: "Invalid teaching license."
                });
            } else if (error.table == 'school_board_types'){
                res.status(400).send({
                    message: "Invalid school board type."
                });
            } else if (error.table == 'medium_of_instructions'){
                res.status(400).send({
                    message: "Invalid medium of instruction."
                });
            } else if (error.table == 'teacher_types'){
                res.status(400).send({
                    message: "Invalid teacher type."
                });
            } else {
                res.status(400).send({
                    message: "Invalid user."
                });
            }
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong."
            });
        }
    }
}

exports.addUserSubjects = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        req.body.user_id = user_id;
        const response = await UserSubjectsService.createUserSubjects(req.body, user_id);
        res.send({
            data: response
        });
    } catch (error) {
        console.log(error)
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Validation error."
            });
        } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
            if (error.table == 'subjects') {
                res.status(400).send({
                    message: "Invalid subject."
                });
            } else {
                res.status(400).send({
                    message: "Invalid user."
                });
            }
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong."
            });
        }
    }
}

exports.addUserEducationHistory = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        const response = await UserEducationHistoryService.createUserEducationHistory(req.body);
        res.send({
            data: response
        });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Validation error."
            });
        } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
            if (error.table == 'subjects') {
                res.status(400).send({
                    message: "Invalid subject."
                });
            } else {
                res.status(400).send({
                    message: "Invalid user."
                });
            }
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong."
            });
        }
    }
}

exports.addUserProfessionalDetails = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        const response = await UserProfessionalDetailsService.createUserProfessionalDetails(req.body);
        res.send({
            data: response
        });
    } catch (error) {
        if (error instanceof CustomError) {
            res.status(400).send({
                message:
                    error.message || "Validation error."
            });
        } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
            if (error.table == 'subjects') {
                res.status(400).send({
                    message: "Invalid subject."
                });
            } else {
                res.status(400).send({
                    message: "Invalid user."
                });
            }
        } else {
            res.status(500).send({
                message:
                    error.message || "Some went wrong."
            });
        }
    }
}
