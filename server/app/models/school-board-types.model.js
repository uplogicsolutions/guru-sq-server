module.exports = (sequelize, Sequelize) => {
    const SchoolBoardTypes = sequelize.define("school_board_types", {
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
        tableName: 'school_board_types'
    });
    return SchoolBoardTypes;
};