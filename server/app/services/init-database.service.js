const db = require("../models");
const constants = require("../constants/db-constants");
const LanguagesModel = db.languages;
const TeacherTypesModel = db.teacherTypes;

exports.initDatabase = async () => {
    try {
        await initLanguages();
        await initTeacherTypes();
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
