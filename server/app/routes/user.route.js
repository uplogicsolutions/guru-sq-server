const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post("/user-personal-details", UserController.addUserPersonalDetails);
router.post("/user-school-details", UserController.addUserSchoolDetails);

module.exports = router;