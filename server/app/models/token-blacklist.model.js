module.exports = (sequelize, Sequelize) => {
    const TokenBlacklist = sequelize.define("token_blacklist", {
        token: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true,
        tableName: 'token_blacklist'
    });
    return TokenBlacklist;
};