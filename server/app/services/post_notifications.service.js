const db = require("../models");
const PostNotifications = db.postNotifications;
const Posts = db.posts;

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


exports.comment = async (commentObj, commentedByUserId) => {
  const post = await Posts.findOne({ where: {post_id: commentObj.post_id}});
  let notification = await PostNotifications.create({
    user_id: post.user_id,
    post_id: commentObj.post_id,
    type: "comment",
    description: `${commentedByUserId} commented on your post.`
  });
}

exports.getPostNotifications = async (user_id) => {
  let notifications = await PostNotifications.findAll({ where: {user_id: user_id}});
  return notifications;
}

exports.readPostNotifications = async (user_id) => {
  let notifications = await PostNotifications.update({read: true}, {where: {user_id: user_id}});
  return notifications;
}

exports.getUnreadNotificationsCount = async (user_id) => {
  let notifications = await PostNotifications.findAll({ where: {user_id: user_id, read: false}});
  return notifications.length;
}