const db = require("../models");
const UserSchoolDetailsModel = db.userSchoolDetails;
const UserPersonalDetailsModel = db.userPersonalDetails;
const TeacherTypeModel = db.teacherTypes;
const CustomError = require("../utils/customError");

exports.getUserSchoolDetails = async (user_id) => {
    let response = await UserSchoolDetailsModel.findOne({ where: { user_id: user_id } });
    return {response};
}

exports.createUserSchoolDetails = async (data) => {
    const teacher = await TeacherTypeModel.findOne({ where: { label: data.teacher_type } });
    if (teacher == null) throw new CustomError("Teacher type does not exist");
    const num = await UserPersonalDetailsModel.update({ teacher_type: teacher.option_id }, { where: { user_id: data.user_id } });
    if (num == 1) {
        if (data.teacher_type == 'School Teacher') {
            const response = await UserSchoolDetailsModel.create(data);
            return response;
        } else {
            return {
                message: 'Successfully updated teacher type'
            }
        }
    } else {
        throw new CustomError("Could not update teacher type" + num);
    }
}