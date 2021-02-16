const jwt = require("jsonwebtoken");

exports.JWTMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (exemptRoutes.includes(req.url)) {
        next();
    } else {
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, 'xgdsxyrfdcutfjufvjgiulvl', (err, user) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }
            req.user = user;
            console.log(user);
            next();
        });
    }
}

const exemptRoutes = [
    '/auth/login',
    '/auth/signup'
]