const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { JWTMiddleware } = require('../middlewares/JWTMiddleware');

router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);

router.use(JWTMiddleware);
router.post("/signout", AuthController.signout);
router.get("/check", AuthController.check);
router.get("/get", AuthController.getUser);

module.exports = router;