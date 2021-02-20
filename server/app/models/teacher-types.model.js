module.exports = (sequelize, Sequelize) => {
    const TeacherTypes = sequelize.define("teacher_types", {
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
        tableName: 'teacher_types'
    });
    return TeacherTypes;
};