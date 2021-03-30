const db = require("../models");
const ClusterModel = db.clusters;

exports.createCluster = async (data) => {
  const cluster = await ClusterModel.create({
    description: data.description,
  });
  return cluster;
}