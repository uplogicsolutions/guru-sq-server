const UserPersonalDetailsService = require('../services/user-personal-details.service');
const UserSchoolDetailsService = require('../services/user-school-details.service');
const UserCoreSubjectsService = require('../services/user-core-subjects.service');
const UserImprovementSubjectsService = require('../services/user-improvement-subjects.service');
const UserGuidanceSubjectsService = require('../services/user-guidance-subjects.service');
const Sequelize = require('sequelize');
const CustomError = require("../utils/customError");

exports.addUserPersonalDetails = async (req, res) => {
    try {
        const response = await UserPersonalDetailsService.createUserPersonalDetails(req.body);
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
            if (error.table == 'languages') {
                res.status(400).send({
                    message: "Invalid mother tongue."
                });
            } else {
                res.status(400).send({
                    message: "Invalid teacher type."
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

exports.addUserCoreSubjects = async (req, res) => {
    try {
        const response = await UserCoreSubjectsService.createUserCoreSubjects(req.body);
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

exports.addUserImprovementSubjects = async (req, res) => {
    try {
        const response = await UserImprovementSubjectsService.createUserImprovementSubjects(req.body);
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

exports.addUserGuidanceSubjects = async (req, res) => {
    try {
        const response = await UserGuidanceSubjectsService.createUserGuidanceSubjects(req.body);
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