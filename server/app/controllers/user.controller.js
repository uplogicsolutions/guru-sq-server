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
        let user_id = req.user.user_id;
        let user_personal_details = await UserPersonalDetailsService.getUserPersonalDetails(user_id);
        if (!user_personal_details) {
            let response = await UserPersonalDetailsService.createUserPersonalDetails(req.body);
            res.send({
                data: response
            });

        } else {
            res.status(400).send({
                message: "User personal details already exists."
            });

        }
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
            } else if (error.table == 'teacher_types') {
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
        let user_id = req.user.user_id;
        let user_school_details = await UserSchoolDetailsService.getUserSchoolDetails(user_id);

        if (user_school_details.response == null) {
            req.body.user_id = req.user.user_id;
            const response = await UserSchoolDetailsService.createUserSchoolDetails(req.body);
            res.send({
                data: response
            });
        } else {
            res.status(400).send({
                message: "User school details already exists."
            });
        }

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
            } else if (error.table == 'teaching_licenses') {
                res.status(400).send({
                    message: "Invalid teaching license."
                });
            } else if (error.table == 'school_board_types') {
                res.status(400).send({
                    message: "Invalid school board type."
                });
            } else if (error.table == 'medium_of_instructions') {
                res.status(400).send({
                    message: "Invalid medium of instruction."
                });
            } else if (error.table == 'teacher_types') {
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
        const user_id = req.user.user_id;
        const response = await UserEducationHistoryService.createUserEducationHistory(req.body, user_id);
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
            } else if (error.table == 'passing_grades') {
                res.status(400).send({
                    message: "Invalid passing grade."
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

exports.editUserPersonalDetails = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        let user_personal_details = await UserPersonalDetailsService.getUserPersonalDetails(req.user.user_id);
        if (!user_personal_details) {
            res.status(400).send({
                message: "User does not exist."
            });
        } else {
            let response = await UserPersonalDetailsService.editUserPersonalDetails(req.body);
            res.send({
                data: response
            });
        }
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
            } else if (error.table == 'teacher_types') {
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

exports.editUserSecondaryLanguages = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        let user_personal_details = await UserPersonalDetailsService.getUserPersonalDetails(req.user.user_id);
        if (!user_personal_details) {
            res.status(400).send({
                message: "User does not exist."
            });
        } else {
            await UserPersonalDetailsService.editUserSecondaryLanguages(req.body);
            res.send({
                data: 'Updated successfully'
            });
        }
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
            } else if (error.table == 'teacher_types') {
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

exports.editUserSchoolDetails = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        await UserSchoolDetailsService.editUserSchoolDetails(req.body);
        res.status(200).send({
            message: "Updated school details."
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
            } else if (error.table == 'teaching_licenses') {
                res.status(400).send({
                    message: "Invalid teaching license."
                });
            } else if (error.table == 'school_board_types') {
                res.status(400).send({
                    message: "Invalid school board type."
                });
            } else if (error.table == 'medium_of_instructions') {
                res.status(400).send({
                    message: "Invalid medium of instruction."
                });
            } else if (error.table == 'teacher_types') {
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

exports.editUserCoreSubjects = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        req.body.user_id = user_id;
        const response = await UserSubjectsService.editUserCoreSubjects(req.body);
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

exports.editUserGuidanceSubjects = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        req.body.user_id = user_id;
        const response = await UserSubjectsService.editUserGuidanceSubjects(req.body);
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

exports.editUserImprovementSubjects = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        req.body.user_id = user_id;
        const response = await UserSubjectsService.editUserImprovementSubjects(req.body);
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

exports.editUserEducationDetails = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        await UserEducationHistoryService.editUserEducationDetails(req.body);
        res.send({
            data: 'Updated successfully'
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
            } else if (error.table == 'teacher_types') {
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

exports.editUserEducationMajorSubjects = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        await UserEducationHistoryService.editUserEducationMajorSubjects(req.body);
        res.send({
            data: 'Updated successfully'
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
            } else if (error.table == 'teacher_types') {
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

exports.editUserEducationMinorSubjects = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        await UserEducationHistoryService.editUserEducationMinorSubjects(req.body);
        res.send({
            data: 'Updated successfully'
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
            } else if (error.table == 'teacher_types') {
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
