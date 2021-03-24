const PostNotificationsService = require('../services/post_notifications.service');
const CustomError = require("../utils/customError");

exports.getPostNotifications = async (req, res) => {
  try {
    const response = await PostNotificationsService.getPostNotifications(req.user.user_id);
    res.send({
      data: response
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).send({
        message:
          error.message || "Validation error."
      });
    } else {
      res.status(500).send({
        message:
          error.message || "Some went wrong."
      });
    }
  }
}

exports.readPostNotifications = async (req, res) => {
  try {
    const response = await PostNotificationsService.readPostNotifications(req.user.user_id);
    res.send({
      data: response
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).send({
        message:
          error.message || "Validation error."
      });
    } else {
      res.status(500).send({
        message:
          error.message || "Some went wrong."
      });
    }
  }
}

exports.getUnreadNotificationsCount = async (req, res) => {
  try {
    const response = await PostNotificationsService.getUnreadNotificationsCount(req.user.user_id);
    res.send({
      data: response
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).send({
        message:
          error.message || "Validation error."
      });
    } else {
      res.status(500).send({
        message:
          error.message || "Some went wrong."
      });
    }
  }
}