const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get("/profile", UserController.getProfile);

router.get("/user-personal-details", UserController.getUserPersonalDetails);

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
router.put("/user-education-details", UserController.editUserEducationDetails);
router.put("/user-education-major-subjects", UserController.editUserEducationMajorSubjects);
router.put("/user-education-minor-subjects", UserController.editUserEducationMinorSubjects);
router.put("/user-job-core-subjects", UserController.editUserJobCoreSubjects);
router.put("/user-job-supplementary-subjects", UserController.editUserJobSupplementarySubjects);
router.put("/user-selected-age-groups", UserController.editUserSelectedAgeGroups);
router.put("/user-professional-details", UserController.editUserProfessionalDetails);

module.exports = router;