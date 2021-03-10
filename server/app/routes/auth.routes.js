const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

router.post("/signin", AuthController.signin);
router.post("/signup", AuthController.signup);
router.post("/signout", AuthController.signout);
router.get("/check", AuthController.check);

module.exports = router;