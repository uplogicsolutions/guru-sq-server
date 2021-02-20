const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post("/user-personal-details", UserController.addUserPersonalDetails);
router.post("/user-school-details", UserController.addUserSchoolDetails);
router.post("/user-core-subjects", UserController.addUserCoreSubjects);
router.post("/user-improvement-subjects", UserController.addUserImprovementSubjects);
router.post("/user-guidance-subjects", UserController.addUserGuidanceSubjects);
router.post("/user-education-history", UserController.addUserEducationHistory);
router.post("/user-professional-details", UserController.addUserProfessionalDetails);

module.exports = router;