const db = require("../models");
const ClusterMessagesModel = db.clusterMessages;
const ClusterUsersModel = db.clusterUsers;

exports.createMessage = async (data, user_id, io) => {
  const cluster = await ClusterUsersModel.findOne({
    where: {
      user_id: user_id,
    }
  });
  const clusterMessage = await ClusterMessagesModel.create({
    message: data.message,
    cluster_id: cluster.cluster_id,
    sender_id: user_id,
  });
  const clusterMessages = await ClusterMessagesModel.findAll({
    where: {
      cluster_id: cluster.cluster_id,
    }
  });
  io.emit("cluster_messages", {
    cluster_id: cluster.cluster_id,
    messages: clusterMessages,
  });
  return clusterMessage;
}

exports.getMessages = async (user) => {
  const cluster = await ClusterUsersModel.findOne({
    where: {
      user_id: user.user_id,
    }
  });
  const clusterMessages = await ClusterMessagesModel.findAll({
    where: {
      cluster_id: cluster.cluster_id,
    }
  });
  return clusterMessages;
}