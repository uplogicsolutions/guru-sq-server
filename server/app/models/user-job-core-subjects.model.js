module.exports = (sequelize, Sequelize) => {
    const UserJobCoreSubjects = sequelize.define("user_job_core_subjects", {
        user_id: {
            type: Sequelize.UUID,
            references: {
                model: "user_login", 
                key: "user_id"
            }
        },
        subject_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "subjects", 
                key: "subject_id"
            }
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'user_job_core_subjects'
    });
    return UserJobCoreSubjects;
};