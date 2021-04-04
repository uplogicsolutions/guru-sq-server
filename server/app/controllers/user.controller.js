const UserPersonalDetailsService = require('../services/user-personal-details.service');
const UserSchoolDetailsService = require('../services/user-school-details.service');
const UserSubjectsService = require('../services/user-subjects.service');
const UserEducationHistoryService = require('../services/user-education-history.service');
const UserProfessionalDetailsService = require('../services/user-professional-details.service');
const CustomErrorUtils = require("../utils/customErrorUtils");

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
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
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
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
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
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
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
        console.log(error)
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
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
        console.log(error)
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
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
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
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
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
    }
}

exports.editUserSubjects = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        req.body.user_id = user_id;
        const response = await UserSubjectsService.editUserSubjects(req.body);
        res.send({
            data: response
        });
    } catch (error) {
        console.log(error)
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
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
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
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
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
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
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
    }
}

exports.editUserJobCoreSubjects = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        req.body.user_id = user_id;
        const response = await UserProfessionalDetailsService.editUserJobCoreSubjects(req.body);
        res.send({
            data: response
        });
    } catch (error) {
        console.log(error)
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
    }
}

exports.editUserJobSupplementarySubjects = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        req.body.user_id = user_id;
        const response = await UserProfessionalDetailsService.editUserJobSupplementarySubjects(req.body);
        res.send({
            data: response
        });
    } catch (error) {
        console.log(error)
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
    }
}

exports.editUserSelectedAgeGroups = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        req.body.user_id = user_id;
        const response = await UserProfessionalDetailsService.editUserSelectedAgeGroups(req.body);
        res.send({
            data: response
        });
    } catch (error) {
        console.log(error)
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
    }
}

exports.editUserProfessionalDetails = async (req, res) => {
    try {
        req.body.user_id = req.user.user_id;
        await UserProfessionalDetailsService.editUserProfessionalDetails(req.body);
        res.send({
            data: 'Updated successfully'
        });
    } catch (error) {
        console.log(error)
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const response = await UserPersonalDetailsService.getProfile(req.user);
        res.send(response);
    } catch (error) {
        res.status(500).send({
            message:
                error.message || "Some went wrong."
        });
    }
}

exports.getUserPersonalDetails = async (req, res) => {
    try {
        const personalDetailsResponse = await UserPersonalDetailsService.getUserPersonalDetails(req.user.user_id);
        const secondaryLanguages = await UserPersonalDetailsService.getUserSecondaryLanguages(req.user.user_id);
        res.send({
            ...personalDetailsResponse.dataValues,
            secondary_languages: secondaryLanguages
        });
    } catch (error) {
        console.log(error)
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
    }
}

exports.getUserSubjects = async (req, res) => {
    try {
        const subjects = await UserSubjectsService.getUserSubjects(req.user.user_id);
        res.send(subjects);
    } catch (error) {
        console.log(error)
        res.status(CustomErrorUtils.getCustomErrorStatus(error))
            .send({
                message: CustomErrorUtils.getCustomErrorMessage(error)
            });
    }
}
