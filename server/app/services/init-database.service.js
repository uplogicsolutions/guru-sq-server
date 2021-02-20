const db = require("../models");
const constants = require("../constants/db-constants");

const LanguagesModel = db.languages;
const TeacherTypesModel = db.teacherTypes;
const SchoolTypesModel = db.schoolTypes;
const SchoolBoardTypesModel = db.schoolBoardTypes;
const TeachingLicensesModel = db.teachingLicenses;
const MediumOfInstructionsModel = db.mediumOfInstructions;
const SubjectsModel = db.subjects;
const PassingGradesModel = db.passingGrades;

exports.initDatabase = async () => {
    try {
        await initLanguages();
        await initTeacherTypes();
        await initSchoolTypes();
        await initSchoolBoardTypes();
        await initTeachingLicenses();
        await initMediumOfInstructions();
        await initSubjects();
        await initPassingGrades();
    } catch(error) {
        console.log(error);
    }
}

const initLanguages = async () => {
    for (let language of constants.languages) {
        const current = await LanguagesModel.findOne({ where: { language_name: language } });
        if(current == null) {
            await LanguagesModel.create({language_name: language});
        }
    }
}

const initTeacherTypes = async () => {
    for (let teacherType of constants.teacherTypes) {
        const current = await TeacherTypesModel.findOne({where: {label: teacherType}});
        if(current == null) {
            await TeacherTypesModel.create({label: teacherType});
        }
    }
}

const initSchoolTypes = async () => {
    for (let schoolType of constants.schoolTypes) {
        const current = await SchoolTypesModel.findOne({where: {label: schoolType}});
        if(current == null) {
            await SchoolTypesModel.create({label: schoolType});
        }
    }
}

const initSchoolBoardTypes = async () => {
    for (let schoolBoardType of constants.schoolBoardTypes) {
        const current = await SchoolBoardTypesModel.findOne({where: {label: schoolBoardType}});
        if(current == null) {
            await SchoolBoardTypesModel.create({label: schoolBoardType});
        }
    }
}

const initTeachingLicenses = async () => {
    for (let licenseType of constants.teachingLicenses) {
        const current = await TeachingLicensesModel.findOne({where: {label: licenseType}});
        if(current == null) {
            await TeachingLicensesModel.create({label: licenseType});
        }
    }
}

const initMediumOfInstructions = async () => {
    for (let instructionType of constants.mediumOfInstructions) {
        const current = await MediumOfInstructionsModel.findOne({where: {label: instructionType}});
        if(current == null) {
            await MediumOfInstructionsModel.create({label: instructionType});
        }
    }
}

const initSubjects = async () => {
    for (let subject of constants.subjects) {
        const current = await SubjectsModel.findOne({where: {subject_name: subject}});
        if(current == null) {
            await SubjectsModel.create({subject_name: subject});
        }
    }
}

const initPassingGrades = async () => {
    for(let grade of constants.passingGrades) {
        const current = await PassingGradesModel.findOne({where: {label: grade}});
        if(current == null) {
            await PassingGradesModel.create({label: grade});
        }
    }
}
