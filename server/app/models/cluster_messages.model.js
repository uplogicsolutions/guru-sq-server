module.exports = (sequelize, Sequelize) => {
  const ClusterMessages = sequelize.define("cluster_messages", {
    cluster_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "clusters",
        key: "cluster_id"
      }
    },
    sender_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "user_login",
        key: "user_id"
      }
    },
    message: {
      type: Sequelize.STRING,
      allowNull: true
    },
    media_type: {
      type: Sequelize.ENUM,
      values: ['image', 'video', 'audio'],
      allowNull: true
    },
    media_url: {
      type: Sequelize.STRING,
      allowNull: true
    },
  }, {
    freezeTableName: true,
    tableName: 'cluster_messages'
  });
  return ClusterMessages;
};