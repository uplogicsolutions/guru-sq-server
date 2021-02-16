const AuthService = require('../services/auth.service');

exports.login = async (req, res) => {
    try{
        const response = await AuthService.login(req.body);
        res.send(response);
    } catch(error) {
        res.status(500).send({
            message:
                error.message || "Some went wrong."
        });
    }
}

exports.logout = async (req, res) => {
    try{
        const response = AuthService.logout();
        res.send(req.user);
    } catch(error) {
        res.status(500).send({
            message:
                error.message || "Some went wrong."
        });
    }
}

exports.signup = async (req, res) => {
    try{
        const response = AuthService.signup(req.body);
        res.send(response);
    } catch(error) {
        res.status(500).send({
            message:
                error.message || "Some went wrong."
        });
    }
}