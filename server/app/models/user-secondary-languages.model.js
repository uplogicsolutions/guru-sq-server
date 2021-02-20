module.exports = (sequelize, Sequelize) => {
    const UserSecondaryLanguages = sequelize.define("user_secondary_languages", {
        user_id: {
            type: Sequelize.UUID,
            references: {
                model: "user_login", 
                key: "user_id"
            }
        },
        language_id: {
            type: Sequelize.INTEGER,
            references: {
                model: "languages", 
                key: "language_id"
            }
        },
        proficiency: {
            type: Sequelize.ENUM,
            values: ['advanced', 'intermediate', 'basic'],
            allowNull: true
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'user_secondary_languages'
    });
    return UserSecondaryLanguages;
};