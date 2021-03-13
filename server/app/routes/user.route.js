const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post("/user-personal-details", UserController.addUserPersonalDetails);
router.post("/user-school-details", UserController.addUserSchoolDetails);
router.post("/user-subjects", UserController.addUserSubjects);
router.post("/user-education-history", UserController.addUserEducationHistory);
router.post("/user-professional-details", UserController.addUserProfessionalDetails);

router.put("/user-personal-details", UserController.editUserPersonalDetails);
router.put("/user-secondary-languages", UserController.editUserSecondaryLanguages);
router.put("/user-school-details", UserController.editUserSchoolDetails);
router.put("/user-core-subjects", UserController.editUserCoreSubjects);
router.put("/user-guidance-subjects", UserController.editUserGuidanceSubjects);
router.put("/user-improvement-subjects", UserController.editUserImprovementSubjects);

module.exports = router;