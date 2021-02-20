module.exports = (sequelize, Sequelize) => {
    const UserGuidanceSubjects = sequelize.define("user_guidance_subjects", {
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
        tableName: 'user_guidance_subjects'
    });
    return UserGuidanceSubjects;
};