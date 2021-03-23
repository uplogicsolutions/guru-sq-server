const db = require("../models");
const ClusterMessagesModel = db.clusterMessages;

exports.sendMessage = async (data) => {
  const clusterMessage = await ClusterMessagesModel.create(data);
  //emit socket event "cluster_message"
  return clusterMessage;
}