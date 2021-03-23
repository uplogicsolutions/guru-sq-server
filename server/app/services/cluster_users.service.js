const db = require("../models");
const ClusterUsersModel = db.clusterUsers;

//add user to randomly any cluster after user is registered
exports.addUserToCluster = async (data) => {
  const clusterUser = await ClusterUsersModel.create({
    cluster_id: data.cluster_id,
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
