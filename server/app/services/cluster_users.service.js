const db = require("../models");
const ClusterUsersModel = db.clusterUsers;
const ClustersService = require("../services/clusters.service");
const sequelize = require("../config/sequelize.config");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//add user to cluster after user is registered
exports.addUserToCluster = async (data) => {
  const cluster = await ClusterUsersModel.findAll({
    group: ['cluster_id'],
    attributes: ['cluster_id',
      [sequelize.fn('count', sequelize.col('user_id')), 'count']],
    having: { 'count': { [Op.lt]: 10 } },
  });
  let id;
  if (!cluster || cluster.length < 1) {
    const newCluster = await ClustersService.createCluster({
      description: data.description,
    });
    id = newCluster.cluster_id;
  } else {
    id = cluster[0].cluster_id;
  }
  const clusterUser = await ClusterUsersModel.create({
    cluster_id: id,
    user_id: data.user_id,
  });
  return clusterUser;
}

//update the cluster to which user belongs weekly
exports.updateClusterForUser = async (data) => {
  await ClusterUsersModel.updateOne({
    cluster_id: data.cluster_id
  }, {
    where: {
      user_id: data.user_id
    }
  });
}
