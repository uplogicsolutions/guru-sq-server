const db = require("../models");
const UserSecondaryLanguagesModel = db.userSecondaryLanguages;
const UserPersonalDetailsModel = db.userPersonalDetails;
const sequelize = require("../config/sequelize.config");
const { subjects, userEducationMajorSubjects } = require("../models");

exports.getUserPersonalDetails = async (user_id) => {
    let response = await UserPersonalDetailsModel.findOne({ where: { user_id: user_id } });
    return response;
}

exports.getUserSecondaryLanguages = async (user_id) => {
    let languages = await UserSecondaryLanguagesModel.findAll({ where: { user_id: user_id } });
    return languages;
}

exports.createUserPersonalDetails = async (data) => {
    data.secondary_languages.map((value) => value.user_id = data.user_id);
    const result = await sequelize.transaction(async (t) => {
        let response = await UserPersonalDetailsModel.create(data, { transaction: t });
        let response2 = await UserSecondaryLanguagesModel.bulkCreate(data.secondary_languages, { transaction: t });
        response = response.get();
        response.secondary_languages = [];
        response2.map((value) => response.secondary_languages.push(value.get()));
        return response;
    });
    return result;

}

exports.editUserPersonalDetails = async (data) => {
    let num = await UserPersonalDetailsModel.update(data, { where: { user_id: data.user_id } })
    if (num == 1) {
        await UserSecondaryLanguagesModel.destroy({
            where: {
                user_id: data.user_id
            }
        });
        for (let language of data.secondary_languages) {
            await UserSecondaryLanguagesModel.create({
                ...language,
                user_id: data.user_id,
            });
        }
        return true;
    }
    return false;
}

exports.editUserSecondaryLanguages = async (data) => {
    for (let currentLanguage of data.remove) {
        await UserSecondaryLanguagesModel.destroy({
            where: {
                user_id: data.user_id,
                language_id: currentLanguage
            }
        })
    }

    for (let currentLanguage of data.data) {
        let record = await UserSecondaryLanguagesModel.findOne({
            where: {
                user_id: data.user_id,
                language_id: currentLanguage.language_id
            }
        });
        if (record) {
            record.proficiency = currentLanguage.proficiency;
            record.save();
        } else {
            currentLanguage.user_id = data.user_id;
            console.log(currentLanguage)
            await UserSecondaryLanguagesModel.create(currentLanguage);
        }
    }
}

exports.getProfile = async (user_id) => {
    let response = {};
    const userLogin = await db.userLogin.findOne({
        attributes: ["username", "user_id"],
        where: { user_id: user_id }
    });
    const userPersonalDetails = await db.userPersonalDetails.findOne({
        attributes: ["first_name", "last_name", "mobile", "email", "photo_url", "gender", "dob"],
        where: { user_id: user_id }
    });
    let userEducationalDetails = await db.userEducationHistory.findAll({
        attributes: ["degree_name", "start_year", "end_year", "institute_name", "passing_grade"],
        where: { user_id: user_id }
    });
    userEducationalDetails.map(async (education) => {
        let passingGradeData = await db.passingGrades.findOne({
            where: { option_id: education.passing_grade }
        });
        education.passing_grade = passingGradeData.label;
    });
    let userEducationMajorSubjects = await db.userEducationMajorSubjects.findAll({
        where: { user_id: user_id }
    });
    let educationMajorSubjects = [];
    userEducationMajorSubjects.map(async(subject) => {
        let currentSubject = await db.subjects.findOne({
            where: { subject_id: subject.subject_id }
        });
        educationMajorSubjects.push(currentSubject.subject_name);
    });
    let userEducationMinorSubjects = await db.userEducationMinorSubjects.findAll({
        where: { user_id: user_id }
    });
    let educationMinorSubjects = [];
    userEducationMinorSubjects.map(async(subject) => {
        let currentSubject = await db.subjects.findOne({
            where: { subject_id: subject.subject_id }
        });
        educationMinorSubjects.push(currentSubject.subject_name);
    });
    let userJobCoreSubjects = await db.userEducationMajorSubjects.findAll({
        where: { user_id: user_id }
    });
    let jobCoreSubjects = [];
    userJobCoreSubjects.map(async(subject) => {
        let currentSubject = await db.subjects.findOne({
            where: { subject_id: subject.subject_id }
        });
        jobCoreSubjects.push(currentSubject.subject_name);
    });
    let userJobSupplementarySubjects = await db.userEducationMajorSubjects.findAll({
        where: { user_id: user_id }
    });
    let jobSupplementarySubjects = [];
    userJobSupplementarySubjects.map(async(subject) => {
        let currentSubject = await db.subjects.findOne({
            where: { subject_id: subject.subject_id }
        });
        jobSupplementarySubjects.push(currentSubject.subject_name);
    });
    const userProfessionalDetails = await db.userProfessionalDetails.findOne({
        attributes: ["job_title", "employed_by", "educational_institute_name", 
            "educational_institute_location", "start_date", "end_date", "form_of_contract"],
        where: { user_id: user_id }
    });
    const userCoreSubjects = await db.userCoreSubjects.findAll({
        attributes: ["subject_id"],
        where: { user_id: user_id }
    });
    let coreSubjects = [];
    userCoreSubjects.map(async (subject) => {
        let currentSubject = await db.subjects.findOne({
            where: { subject_id: subject.subject_id }
        });
        coreSubjects.push(currentSubject.subject_name)
    });
    const userGuidanceSubjects = await db.userGuidanceSubjects.findAll({
        attributes: ["subject_id"],
        where: { user_id: user_id }
    });
    let guidanceSubjects = [];
    userGuidanceSubjects.map(async (subject) => {
        let currentSubject = await db.subjects.findOne({
            where: { subject_id: subject.subject_id }
        });
        guidanceSubjects.push(currentSubject.subject_name)
    });
    const userImprovementSubjects = await db.userImprovementSubjects.findAll({
        attributes: ["subject_id"],
        where: { user_id: user_id }
    });
    let improvementSubjects = [];
    userImprovementSubjects.map(async (subject) => {
        let currentSubject = await db.subjects.findOne({
            where: { subject_id: subject.subject_id }
        });
        improvementSubjects.push(currentSubject.subject_name);
    });
    response = {
        ...userLogin.dataValues,
        ...userPersonalDetails.dataValues,
        educational_details: userEducationalDetails,
        education_major_subject: educationMajorSubjects,
        education_minor_subject: educationMinorSubjects,
        professional_details: userProfessionalDetails,
        job_core_subjects: jobCoreSubjects,
        job_supplementary_subjects: jobSupplementarySubjects,
        core_subjects: coreSubjects,
        guidance_subjects: guidanceSubjects,
        improvement_subjects: improvementSubjects,
    }

    return response;
}