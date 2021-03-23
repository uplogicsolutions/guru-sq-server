module.exports = (sequelize, Sequelize) => {
  const ClusterUsers = sequelize.define("cluster_users", {
    cluster_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "clusters",
        key: "cluster_id"
      }
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "user_login",
        key: "user_id"
      }
    },
  }, {
    freezeTableName: true,
    tableName: 'cluster_users'
  });
  return ClusterUsers;
};