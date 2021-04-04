const db = require("../models");
const ClusterUsersModel = db.clusterUsers;
const ClustersService = require("../services/clusters.service");
const User = db.userPersonalDetails;

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

exports.getClusterUsers = async (user) => {
  const cluster = await ClusterUsersModel.findOne({
    where: {
      user_id: user.user_id,
    }
  });
  const clusterUsers = await ClusterUsersModel.findAll({
    where: {
      cluster_id: cluster.cluster_id,
    }
  });
  let users = [];
  for (let clusterUser of clusterUsers) {
    let userDetails = await User.findOne({ where: { user_id: clusterUser.user_id } });
    let name = '';
    if(userDetails) {
      if(userDetails.first_name) name = userDetails.first_name;
      if(userDetails.last_name) name = name + ' ' + userDetails.last_name;
    }
    users.push({
      ...clusterUser,
      name: name,
      user_id: userDetails.user_id,
      profileImage: 'https://thathasthuwellness.com/wp-content/uploads/2020/05/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg',
    });
  }
  return users;
}
