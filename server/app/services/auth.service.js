const jwt = require("jsonwebtoken");

exports.signup = async (data) => {
    return {
        message: "User signup successfully"
    }
}

exports.login = async (data) => {
    const token = jwt.sign({username: data.username, test: "hello"}, 'xgdsxyrfdcutfjufvjgiulvl', { expiresIn: '2 days' });
    return {
        token: token
    }
}

exports.logout = async () => {
    return {
        message: "User logout successfully"
    }
}