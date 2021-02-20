module.exports = (sequelize, Sequelize) => {
    const MediumOfInstructions = sequelize.define("medium_of_instructions", {
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
        tableName: 'medium_of_instructions'
    });
    return MediumOfInstructions;
};