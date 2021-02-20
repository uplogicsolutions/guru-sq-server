module.exports = (sequelize, Sequelize) => {
    const Subjects = sequelize.define("subjects", {
        subject_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        subject_name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'subjects'
    });
    return Subjects;
};