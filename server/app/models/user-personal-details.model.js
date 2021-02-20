module.exports = (sequelize, Sequelize) => {
    const UserPersonalDetails = sequelize.define("user_personal_details", {
        user_id: {
            type: Sequelize.UUID,
            references: {
                model: "user_login", 
                key: "user_id"
            }
        },
        first_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        mobile: {
            type: Sequelize.STRING,
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        photo_url: {
            type: Sequelize.STRING,
            allowNull: true
        },
        gender: {
            type: Sequelize.ENUM,
            values: ['male', 'female', 'other'],
            allowNull: true
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: true
        },
        mother_tongue: {
            type: Sequelize.INTEGER,
            references: {
                model: "languages", 
                key: "language_id"
            }
        },
        teacher_type: {
            type: Sequelize.INTEGER,
            references: {
                model: "teacher_types", 
                key: "option_id"
            }
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'user_personal_details'
    });
    return UserPersonalDetails;
};