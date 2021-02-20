module.exports = (sequelize, Sequelize) => {
    const UserSchoolDetails = sequelize.define("user_school_details", {
        user_id: {
            type: Sequelize.UUID,
            references: {
                model: "user_login", 
                key: "user_id"
            }
        },
        type_of_school_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "school_types", 
                key: "option_id"
            }
        },
        license_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "teaching_licenses", 
                key: "option_id"
            }
        },
        board_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "school_board_types", 
                key: "option_id"
            }
        },
        medium_of_instructions_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "medium_of_instructions", 
                key: "option_id"
            }
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'user_school_details'
    });
    return UserSchoolDetails;
};