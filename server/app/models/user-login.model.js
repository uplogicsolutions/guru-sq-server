module.exports = (sequelize, Sequelize) => {
    const UserLogin = sequelize.define("user_logins", {
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    });
    return UserLogin;
};