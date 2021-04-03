const jwt = require("jsonwebtoken");
const TokenBlacklistService = require('../services/token-blacklist.service');

exports.JWTMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        } else {
            const valid = await TokenBlacklistService.checkValidity({ token: token });
            if (valid) {
                req.user = user;
                next();
            } else {
                return res.sendStatus(403);
            }
        }
    });
}