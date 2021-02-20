module.exports = (sequelize, Sequelize) => {
    const SchoolTypes = sequelize.define("school_types", {
        option_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        label: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'school_types'
    });
    return SchoolTypes;
};