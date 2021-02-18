module.exports = (sequelize, Sequelize) => {
    const UserLogin = sequelize.define("user_login", {
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        tableName: 'user_login'
    });
    return UserLogin;
};