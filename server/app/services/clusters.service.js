const db = require("../models");
const ClusterModel = db.clusters;

exports.createCluster = async (data) => {
  const cluster = await ClusterModel.create({
    cluster_name: data.name,
    description: data.description,
  });
  return cluster;
}