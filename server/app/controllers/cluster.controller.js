const ClusterMessagesService = require('../services/cluster_messages.service');
const ClusterUsersService = require('../services/cluster_users.service');
const CustomError = require("../utils/customError");

exports.createMessage = async (req, res) => {
  try {
    const response = await ClusterMessagesService.createMessage(req.body, req.user.user_id, req.io);
    res.send(response);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).send({
        message:
          error.message || "Validation error"
      });
    } else {
      res.status(500).send({
        message:
          error.message || "Something went wrong."
      });
    }
  }
}

exports.getMessages = async (req, res) => {
  try {
    const response = await ClusterMessagesService.getMessages(req.user);
    res.send(response);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).send({
        message:
          error.message || "Validation error"
      });
    } else {
      res.status(500).send({
        message:
          error.message || "Something went wrong."
      });
    }
  }
}

exports.getUsers = async (req, res) => {
  try {
    const response = await ClusterUsersService.getClusterUsers(req.user);
    res.send(response);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).send({
        message:
          error.message || "Validation error"
      });
    } else {
      res.status(500).send({
        message:
          error.message || "Something went wrong."
      });
    }
  }
}
