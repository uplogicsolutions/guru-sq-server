const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.post("/", UserController.createUser);
router.get("/", UserController.findUsers);
router.get("/:id", UserController.findUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;