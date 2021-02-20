module.exports = (sequelize, Sequelize) => {
    const PassingGrades = sequelize.define("passing_grades", {
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
        tableName: 'passing_grades'
    });
    return PassingGrades;
};