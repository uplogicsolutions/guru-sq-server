module.exports = (sequelize, Sequelize) => {
    const StudentAgeGroups = sequelize.define("student_age_groups", {
        group_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        start_age: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        end_age: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, 
    {
        freezeTableName: true,
        tableName: 'student_age_groups'
    });
    return StudentAgeGroups;
};