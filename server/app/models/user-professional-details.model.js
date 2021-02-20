module.exports = (sequelize, Sequelize) => {
    const UserProfessionalDetails = sequelize.define("user_professional_details", {
        user_id: {
            type: Sequelize.UUID,
            references: {
                model: "user_login", 
                key: "user_id"
            }
        },
        job_title: {
            type: Sequelize.STRING,
            allowNull: true
        },
        is_class_teacher: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        employed_by: {
            type: Sequelize.ENUM,
            values: ['School', 'Non-schooling education institute', 'Self-employed'],
            allowNull: true
        },
        educational_institute_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        educational_institute_location: {
            type: Sequelize.STRING,
            allowNull: true
        },
        start_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        end_date: {
            type: Sequelize.DATE,
            allowNull: true
        },
        form_of_contract: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: "form_of_contracts", 
                key: "option_id"
            }
        },
        description: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'user_professional_details'
    });
    return UserProfessionalDetails;
};