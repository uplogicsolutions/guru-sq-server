module.exports = (sequelize, Sequelize) => {
    const Languages = sequelize.define("languages", {
        language_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        language_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'languages'
    });
    return Languages;
};