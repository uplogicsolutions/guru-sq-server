module.exports = (sequelize, Sequelize) => {
    const UserEducationHistory = sequelize.define("user_education_history", {
        user_id: {
            type: Sequelize.UUID,
            references: {
                model: "user_login", 
                key: "user_id"
            }
        },
        degree_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        start_year: {
            type: Sequelize.DATE,
            allowNull: true
        },
        end_year: {
            type: Sequelize.DATE,
            allowNull: true
        },
        institute_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        passing_grade: {
            type: Sequelize.INTEGER,
            references: {
                model: "passing_grades", 
                key: "option_id"
            }
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'user_education_history'
    });
    return UserEducationHistory;
};