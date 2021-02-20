module.exports = (sequelize, Sequelize) => {
    const UserEducationMinorSubjects = sequelize.define("user_education_minor_subjects", {
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
        tableName: 'user_education_minor_subjects'
    });
    return UserEducationMinorSubjects;
};