const PostService = require('../services/posts.service');
const Sequelize = require('sequelize');
const CustomError = require("../utils/customError");

exports.addPost = async (req, res) => {
  try {
    req.body.user_id = req.user.user_id;
    const response = await PostService.createPost(req.body);
    res.send({
      data: response
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).send({
        message:
          error.message || "Validation error."
      });
    } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
      if (error.table == 'posts') {
        res.status(400).send({
          message: "Invalid post."
        });
      } else {
        res.status(400).send({
          message: "Invalid user."
        });
      }
    } else {
      res.status(500).send({
        message:
          error.message || "Some went wrong."
      });
    }
  }
}

exports.like = async (req, res) => {
  try {
    req.body.user_id = req.user.user_id;
    const response = await PostService.createLike(req.body);
    res.send({
      data: response
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).send({
        message:
          error.message || "Validation error."
      });
    } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
      if (error.table == 'posts') {
        res.status(400).send({
          message: "Invalid post."
        });
      } else {
        res.status(400).send({
          message: "Invalid user."
        });
      }
    } else {
      res.status(500).send({
        message:
          error.message || "Some went wrong."
      });
    }
  }
}

exports.comment = async (req, res) => {
  try {
    req.body.user_id = req.user.user_id;
    const response = await PostService.createComment(req.body);
    res.send({
      data: response
    });
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(400).send({
        message:
          error.message || "Validation error."
      });
    } else if (error instanceof Sequelize.ForeignKeyConstraintError) {
      if (error.table == 'posts') {
        res.status(400).send({
          message: "Invalid post."
        });
      } else {
        res.status(400).send({
          message: "Invalid user."
        });
      }
    } else {
      res.status(500).send({
        message:
          error.message || "Some went wrong."
      });
    }
  }
}

