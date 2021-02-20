const db = require("../models");
const LanguagesModel = db.languages;
const TeacherTypesModel = db.teacherTypes;
const SchoolTypesModel = db.schoolTypes;
const SchoolBoardTypesModel = db.schoolBoardTypes;
const TeachingLicensesModel = db.teachingLicenses;
const MediumOfInstructionsModel = db.mediumOfInstructions;
const SubjectsModel = db.subjects;

exports.getOptions = async (data) => {
    const type = data.type || '';
    let response = [];
    if (type == 'languages') {
        response = await LanguagesModel.findAll({
            attributes: ['language_id', 'language_name']
        });
    } else if (type == 'teacher types') {
        response = await TeacherTypesModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'school types') {
        response = await SchoolTypesModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'school board types') {
        response = await SchoolBoardTypesModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'teaching licenses') {
        response = await TeachingLicensesModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'medium of instructions') {
        response = await MediumOfInstructionsModel.findAll({
            attributes: ['option_id', 'label']
        })
    } else if (type == 'subjects') {
        response = await SubjectsModel.findAll({
            attributes: ['subject_id', 'subject_name']
        })
    }
    return response;
}