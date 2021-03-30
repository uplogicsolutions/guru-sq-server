const db = require("../models");
const UserProfessionalDetailsModel = db.userProfessionalDetails;
const UserJobCoreSubjectsModel = db.userJobCoreSubjects;
const UserJobSupplementarySubjectsModel = db.userJobSupplementarySubjects;
const UserSelectedStudentAgeGroupsModel = db.userSelecetedStudentAgeGroups;
const sequelize = require("../config/sequelize.config");

exports.createUserProfessionalDetails = async (data) => {
    let core_subjects = [];
    data.core_subjects.map((value) => core_subjects.push({ user_id: data.user_id, subject_id: value }));
    let supplementary_subjects = [];
    data.supplementary_subjects.map((value) => supplementary_subjects.push({ user_id: data.user_id, subject_id: value }));
    let selected_age_groups = [];
    data.selected_age_groups.map((value) => selected_age_groups.push({ user_id: data.user_id, group_id: value }));
    let jobs = [];
    data.jobs.map((value) => jobs.push({ ...value, user_id: data.user_id }));
    const result = await sequelize.transaction(async (t) => {
        let response1 = await UserJobCoreSubjectsModel.bulkCreate(core_subjects, { transaction: t });
        let response2 = await UserJobSupplementarySubjectsModel.bulkCreate(supplementary_subjects, { transaction: t });
        let response3 = await UserSelectedStudentAgeGroupsModel.bulkCreate(selected_age_groups, { transaction: t });
        let response4 = await UserProfessionalDetailsModel.bulkCreate(jobs, { transaction: t });
        let response = {};
        response.jobs = [];
        response4.map((value) => response.jobs.push(value.get()));
        response.major_subjects = [];
        response1.map((value) => response.major_subjects.push(value.get()));
        response.minor_subjects = [];
        response2.map((value) => response.minor_subjects.push(value.get()));
        response.selected_age_groups = [];
        response3.map((value) => response.selected_age_groups.push(value.get()));
        return response;
    });
    return result;
}

exports.editUserJobCoreSubjects = async (data) => {
    for(let currentSubject of data.remove) {
        await UserJobCoreSubjectsModel.destroy({
            where: {
                user_id: data.user_id, 
                subject_id: currentSubject
            }
        })
    }
    for (let currentSubject of data.data) {
        let record = await UserJobCoreSubjectsModel.findOne({
            where: { 
                user_id: data.user_id, 
                subject_id: currentSubject.subject_id 
            }
        });
        if (!record) {
            currentSubject.user_id = data.user_id;
            await UserJobCoreSubjectsModel.create(currentSubject);
        }
    }
}

exports.editUserJobSupplementarySubjects = async (data) => {
    for(let currentSubject of data.remove) {
        await UserJobSupplementarySubjectsModel.destroy({
            where: {
                user_id: data.user_id, 
                subject_id: currentSubject
            }
        })
    }
    for (let currentSubject of data.data) {
        let record = await UserJobSupplementarySubjectsModel.findOne({
            where: { 
                user_id: data.user_id, 
                subject_id: currentSubject.subject_id 
            }
        });
        if (!record) {
            currentSubject.user_id = data.user_id;
            await UserJobSupplementarySubjectsModel.create(currentSubject);
        }
    }
}

exports.editUserSelectedAgeGroups = async (data) => {
    for(let current of data.remove) {
        await UserSelectedStudentAgeGroupsModel.destroy({
            where: {
                user_id: data.user_id, 
                group_id: current
            }
        })
    }
    for (let current of data.data) {
        let record = await UserSelectedStudentAgeGroupsModel.findOne({
            where: { 
                user_id: data.user_id, 
                group_id: current
            }
        });
        if (!record) {
            await UserSelectedStudentAgeGroupsModel.create({
                user_id: data.user_id, 
                group_id: current
            });
        }
    }
}

exports.editUserProfessionalDetails = async (data) => {
    let job = await UserProfessionalDetailsModel.findOne({where: {user_id: data.user_id, id: data.job.id}});
    if(job) {
        await UserProfessionalDetailsModel.update(data.job, {where: {user_id: data.user_id, id: data.job.id}});
    } else {
        throw new CustomError('Not found')
    }
}
