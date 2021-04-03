const express = require('express');
const router = express.Router();
const ClusterController = require('../controllers/cluster.controller');
const { JWTMiddleware } = require('../middlewares/JWTMiddleware');

router.use(JWTMiddleware);
router.post("/sendMessage", ClusterController.createMessage);
router.get("/getMessages", ClusterController.getMessages);
router.get("/users", ClusterController.getUsers);

module.exports = router;