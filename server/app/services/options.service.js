const db = require("../models");
const LanguagesModel = db.languages;
const TeacherTypesModel = db.teacherTypes;

exports.getOptions = async (data) => {
    const type = data.type || '';
    if (type == 'languages') {
        const languages = await LanguagesModel.findAll({
            attributes: ['language_id', 'language_name']
        });
        return languages;
    } else if (type == 'teacher types') {
        const teacherTypes = await TeacherTypesModel.findAll({
            attributes: [ 'option_id', 'label' ]
        })
        return teacherTypes;
    } else {
        return [];
    }
}