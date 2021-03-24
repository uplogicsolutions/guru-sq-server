const db = require("../models");
const PostNotifications = db.postNotifications;
const Posts = db.posts;
const PostLikes = db.postLikes;
const PostComments = db.postComments;

exports.like = async (likeObj) => {
  const post = await Posts.findOne({ where: {post_id: likeObj.post_id}});
  let notification = await PostNotifications.findOne({
    where: {
      user_id: post.user_id,
      post_id: likeObj.post_id,
      type: "like"
    }
  });
  if(notification) {
    if(notification.read) {
      await PostNotifications.create({
        user_id: post.user_id,
        post_id: likeObj.post_id,
        type: "like",
        description: (Number(notification.description) + 1).toString()
      });
    } else {
      notification.description = (Number(notification.description) + 1).toString();
      await notification.save();
    }

  } else {
    notification = await PostNotifications.create({
      user_id: post.user_id,
      post_id: likeObj.post_id,
      type: "like",
      description: "1"
    });
  }
}


exports.comment = async (commentObj, commentedByUserId, io) => {
  const post = await Posts.findOne({ where: {post_id: commentObj.post_id}});
  let notification = await PostNotifications.create({
    user_id: post.user_id,
    post_id: commentObj.post_id,
    type: "comment",
    description: `${commentedByUserId} commented on your post.`
  });
  
  const comments = await PostComments.findAll({ where: { post_id: commentObj.post_id } });
  io.emit("comment", {
    user_id: post.user_id,
    commented_by_user_id: commentedByUserId,
    commnets: comments,
    post_id: post.post_id,
    description: `${commentedByUserId} commented on your post.`
  });
}
