const db = require("../models");
const Posts = db.posts;
const PostLikes = db.postLikes;
const PostComments = db.postComments;
const User = db.userPersonalDetails;
const CustomError = require("../utils/customError");

const PostNotificationsService = require("./post_notifications.service");

exports.createPost = async (data) => {
  if (!data.post_type || !data.visibility) {
    throw new CustomError("Imcomplete data.");
  }
  const post = await Posts.create(data);
  return post;
}

exports.createLike = async (data, io) => {
  const like = await PostLikes.findOne({ where: { post_id: data.post_id, user_id: data.user_id } });
  let type = 'like';
  if (like && like.like_id) {
    //unlike
    type = 'unlike';
    const num = await PostLikes.destroy({
      where: { like_id: like.like_id }
    });
    if (num != 1) {
      throw Error("Something went wrong");
    }
  } else {
    //like
    const newLike = await PostLikes.create(data);
    await PostNotificationsService.like(newLike.dataValues);
  }
  const likes = await PostLikes.findAll({ where: { post_id: data.post_id } });
  io.emit("like", {
    liked_type: type,
    liked_by_user_id: data.user_id,
    likesCount: likes ? likes.length : 0,
    post_id: data.post_id,
  });
  return true;
}

exports.createComment = async (data, io) => {
  if (!data.comment) {
    throw new CustomError("Comment is required");
  }
  const comment = await PostComments.create(data);
  await PostNotificationsService.comment(comment, data.user_id);
  const comments = await PostComments.findAll({ where: { post_id: comment.post_id }});
  let resultComments = [];
  for (let comment of comments) {
    let user = await User.findOne({ where: { user_id: comment.user_id } });
    resultComments.push({
      ...comment.dataValues,
      firstName: user.first_name,
      lastName: user.last_name
    })
  }
  io.emit("comment", {
    post_id: comment.post_id,
    comments: resultComments,
  });
  return true;
}

exports.getPosts = async (user_id) => {
  let posts = await Posts.findAll();
  let resultPosts = [];
  for (let post of posts) {
    let user = await User.findOne({ where: { user_id: post.user_id } });
    let likes = await PostLikes.findAll({ where: { post_id: post.post_id } });
    let isLiked = false;
    let like = await PostLikes.findOne({ where: { user_id: user_id, post_id: post.post_id } });
    if (like) isLiked = true;
    let comments = await PostComments.findAll({ where: { post_id: post.post_id } });
    let resultComments = [];
    for (let comment of comments) {
      let user = await User.findOne({ where: { user_id: comment.user_id } });
      resultComments.push({
        ...comment.dataValues,
        firstName: user.first_name,
        lastName: user.last_name
      })
    }
    resultPosts.push({
      ...post.dataValues,
      firstName: user.first_name,
      lastName: user.last_name,
      likesCount: likes.length,
      isLiked: isLiked,
      comments: resultComments,
    });
  }
  return resultPosts;
}
