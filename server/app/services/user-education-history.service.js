const db = require("../models");
const UserEducationHistoryModel = db.userEducationHistory;
const UserEducationMajorSubjectsModel = db.userEducationMajorSubjects;
const UserEducationMinorSubjectsModel = db.userEducationMinorSubjects;

const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const CustomError = require("../utils/customError");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: 'mysql80-afe9.euw2.cloud.ametnes.com',
    port: 3316,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(path.resolve(__dirname,'../certs/BaltimoreCyberTrustRoot.crt.pem'))
      }
    }
  });

exports.createUserEducationHistory = async (data, user_id) => {
    data.educations.map((education) => education.user_id = user_id);
    let major_subjects = [];
    data.major_subjects.map((value) => major_subjects.push({user_id: user_id, subject_id: value}));
    let minor_subjects = [];
    data.minor_subjects.map((value) => minor_subjects.push({user_id: user_id, subject_id: value}));
    const result = await sequelize.transaction(async (t) => {
        let response1 = await UserEducationMajorSubjectsModel.bulkCreate(major_subjects, { transaction: t });
        let response2 = await UserEducationMinorSubjectsModel.bulkCreate(minor_subjects, { transaction: t });
        let response3 = await UserEducationHistoryModel.bulkCreate(data.educations, { transaction: t });
        let response = {};
        response.major_subjects = [];
        response1.map((value) => response.major_subjects.push(value.get()));
        response.minor_subjects = [];
        response2.map((value) => response.minor_subjects.push(value.get()));
        response.educations = [];
        response3.map((value) => response.educations.push(value.get()));
        return response;
    });
    return result;
}

exports.editUserEducationDetails = async (data) => {
    let education = await UserEducationHistoryModel.findOne({where: {user_id: data.user_id, id: data.education.id}});
    if(education) {
        await UserEducationHistoryModel.update(data.education, {where: {user_id: data.user_id, id: data.education.id}});
    } else {
        throw new CustomError('Not found')
    }
}

exports.editUserEducationMajorSubjects = async (data) => {
    for(let currentSubject of data.remove) {
        await UserEducationMajorSubjectsModel.destroy({
            where: {
                user_id: data.user_id, 
                subject_id: currentSubject
            }
        })
    }
    for (let currentSubject of data.data) {
        let record = await UserEducationMajorSubjectsModel.findOne({
            where: { 
                user_id: data.user_id, 
                subject_id: currentSubject.subject_id 
            }
        });
        if (!record) {
            currentSubject.user_id = data.user_id;
            await UserEducationMajorSubjectsModel.create(currentSubject);
        }
    }
}

exports.editUserEducationMinorSubjects = async (data) => {
    for(let currentSubject of data.remove) {
        await UserEducationMinorSubjectsModel.destroy({
            where: {
                user_id: data.user_id, 
                subject_id: currentSubject
            }
        })
    }
    for (let currentSubject of data.data) {
        let record = await UserEducationMinorSubjectsModel.findOne({
            where: { 
                user_id: data.user_id, 
                subject_id: currentSubject.subject_id 
            }
        });
        if (!record) {
            currentSubject.user_id = data.user_id;
            await UserEducationMinorSubjectsModel.create(currentSubject);
        }
    }
}
