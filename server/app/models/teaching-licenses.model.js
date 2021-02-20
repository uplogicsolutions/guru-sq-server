module.exports = (sequelize, Sequelize) => {
    const TeachingLicenses = sequelize.define("teaching_licenses", {
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
        tableName: 'teaching_licenses'
    });
    return TeachingLicenses;
};