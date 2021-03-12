const db = require("../models");
const LanguagesModel = db.languages;
const TeacherTypesModel = db.teacherTypes;
const SchoolTypesModel = db.schoolTypes;
const SchoolBoardTypesModel = db.schoolBoardTypes;
const TeachingLicensesModel = db.teachingLicenses;
const MediumOfInstructionsModel = db.mediumOfInstructions;
const SubjectsModel = db.subjects;
const PassingGradesModel = db.passingGrades;
const FormOfContractsModel = db.formOfContracts;
const StudentAgeGroupsModel = db.studentAgeGroups;
const dbConstants = require('../constants/db-constants');

exports.getOptions = async (data) => {
    const type = data.type || '';
    let response = [];
    if (type == 'languages') {
        response = await LanguagesModel.findAll({
            attributes: ['language_id', 'language_name']
        });
    } else if (type == 'teacherTypes') {
        response = await TeacherTypesModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'schoolTypes') {
        response = await SchoolTypesModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'schoolBoardTypes') {
        response = await SchoolBoardTypesModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'teachingLicenses') {
        response = await TeachingLicensesModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'mediumOfInstructions') {
        response = await MediumOfInstructionsModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'subjects') {
        response = await SubjectsModel.findAll({
            attributes: ['subject_id', 'subject_name']
        })
    } else if (type == 'passingGrades') {
        response = await PassingGradesModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'formOfContracts') {
        response = await FormOfContractsModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'studentAgeGroups') {
        response = await StudentAgeGroupsModel.findAll({
            attributes: ['group_id', 'start_age', 'end_age']
        })
    } else if (type == 'gender') {
        response = dbConstants.gender
    } else if (type == 'proficiency') {
        response = dbConstants.proficiency
    } else if (type == 'employerTypes') {
        response = dbConstants.employerTypes
    }
    return response;
}