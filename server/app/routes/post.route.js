const express = require('express');
const router = express.Router();
const PostController = require('../controllers/post.controller');

router.post("/add", PostController.addPost);
router.post("/like", PostController.like);
router.post("/comment", PostController.comment);
router.get("/all", PostController.getPosts);

module.exports = router;