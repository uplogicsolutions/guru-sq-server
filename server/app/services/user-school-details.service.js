const db = require("../models");
const UserSchoolDetailsModel = db.userSchoolDetails;
const UserPersonalDetailsModel = db.userPersonalDetails;
const TeacherTypeModel = db.teacherTypes;
const CustomError = require("../utils/customError");

exports.getUserSchoolDetails = async (user_id) => {
    const user = await UserPersonalDetailsModel.findOne({ where: { user_id: user_id } });
    const teacherType = await TeacherTypeModel.findOne({ where: { option_id: user.teacher_type } });
    let response = null;
    if (teacherType) {
        if (teacherType.label == 'School Teacher') {
            const schoolDetails = await UserSchoolDetailsModel.findOne({ where: { user_id: user_id } });
            response = {
                teacher_type: teacherType.label,
                ...schoolDetails.dataValues,
            };
        } else {
            response = {
                teacher_type: teacherType.label
            };
        }
    }
    return response;
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

exports.editUserSchoolDetails = async (data) => {
    const user = await UserPersonalDetailsModel.findOne({ where: { user_id: data.user_id } });
    const schoolTeacher = await TeacherTypeModel.findOne({ where: { label: 'School Teacher' } });
    const teacher = await TeacherTypeModel.findOne({ where: { label: data.teacher_type } });
    if (!teacher) throw new CustomError("Teacher type does not exist");
    await UserPersonalDetailsModel.update({ teacher_type: teacher.option_id }, { where: { user_id: data.user_id } });
    if (user) {
        if (user.teacher_type == schoolTeacher.option_id) {
            if (teacher.option_id == schoolTeacher.option_id) {
                await UserSchoolDetailsModel.update(data, { where: { user_id: data.user_id } });
            } else {
                await UserSchoolDetailsModel.destroy({ where: { user_id: data.user_id } });
            }
        } else {
            if (teacher.option_id == schoolTeacher.option_id) {
                await UserSchoolDetailsModel.create(data);
            }
        }
    } else {
        throw new CustomError("User does not exist");
    }
}
