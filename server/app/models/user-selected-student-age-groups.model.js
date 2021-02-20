module.exports = (sequelize, Sequelize) => {
    const UserSelectedStudentAgeGroups = sequelize.define("user_selected_student_age_groups", {
        group_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "student_age_groups", 
                key: "group_id"
            }
        },
        user_id: {
            type: Sequelize.UUID,
            references: {
                model: "user_login", 
                key: "user_id"
            }
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'user_selected_student_age_groups'
    });
    return UserSelectedStudentAgeGroups;
};