const db = require("../models");
const ClusterMessagesModel = db.clusterMessages;

exports.createMessage = async (data, user_id, io) => {
  const clusterMessage = await ClusterMessagesModel.create({
    ...data,
    sender_id: user_id,
  });
  const clusterMessages = await ClusterMessagesModel.findAll({
    where: {
      cluster_id: data.cluster_id,
    }
  });
  io.emit("cluster_messages", {
    cluster_id: data.cluster_id,
    messages: clusterMessages,
  });
  return clusterMessage;
}

exports.getMessages = async (data) => {
  const clusterMessages = await ClusterMessagesModel.findAll({
    where: {
      cluster_id: data.cluster_id,
    }
  });
  return clusterMessages;
}