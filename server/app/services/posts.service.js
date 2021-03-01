const db = require("../models");
const Posts = db.posts;
const PostLikes = db.postLikes;
const PostComments = db.postComments;
const CustomError = require("../utils/customError");

exports.createPost = async (data) => {
  if (!data.post_type || !data.visibility) {
    throw new CustomError("Imcomplete data.");
  }
  const post = await Posts.create(data);
  return post;
}

exports.createLike = async (data) => {
  const like = await PostLikes.findOne({ where: { post_id: data.post_id, user_id: data.user_id } });
  if (like && like.like_id) {
    //unlike
    const num = await PostLikes.destroy({
      where: { like_id: like.like_id }
    });
    if (num != 1) {
      throw Error("Like does not exist");
    }
    return {
      message: "Successfully liked post"
    }
  } else {
    //like
    const newLike = await PostLikes.create(data);
    return newLike;
  }
}

exports.createComment = async (data) => {
  const comment = await PostComments.findOne({ where: { post_id: data.post_id, user_id: data.user_id } });
  if (comment && comment.comment_id) {
    //uncomment => delete
    const num = await PostComments.destroy({
      where: { comment_id: comment.comment_id }
    });
    if (num != 1) {
      throw Error("Comment does not exist");
    }
    return {
      message: "Successfully commented on post"
    }
  } else {
    //comment
    const newComment = await PostComments.create(data);
    return newComment;
  }
}
