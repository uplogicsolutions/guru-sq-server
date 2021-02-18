module.exports = (sequelize, Sequelize) => {
    const UserLogin = sequelize.define("user_login", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING.BINARY,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        tableName: 'user_login'
    });
    return UserLogin;
};