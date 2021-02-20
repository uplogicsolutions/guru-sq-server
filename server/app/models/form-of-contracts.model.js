module.exports = (sequelize, Sequelize) => {
    const FormOfContracts = sequelize.define("form_of_contracts", {
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
        tableName: 'form_of_contracts'
    });
    return FormOfContracts;
};