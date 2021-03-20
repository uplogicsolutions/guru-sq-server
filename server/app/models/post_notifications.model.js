module.exports = (sequelize, Sequelize) => {
  const PostNotifications = sequelize.define("post_notifications", {
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "user_login",
        key: "user_id"
      }
    },
    post_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "posts",
        key: "post_id"
      }
    },
    type: {
      type: Sequelize.ENUM,
      values: ['like', 'follow', 'comment', 'share'],
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    read: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'post_notifications'
  });
  return PostNotifications;
};