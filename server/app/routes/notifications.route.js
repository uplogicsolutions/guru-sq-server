const express = require('express');
const router = express.Router();
const NotificationsController = require('../controllers/notifications.controller');

router.get("/", NotificationsController.getPostNotifications);
router.get("/read", NotificationsController.readPostNotifications);
router.get("/count", NotificationsController.getUnreadNotificationsCount);

module.exports = router;