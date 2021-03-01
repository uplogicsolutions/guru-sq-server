module.exports = (sequelize, Sequelize) => {
  const PostLikes = sequelize.define("post_likes", {
    like_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    post_id: {
      type: Sequelize.UUID,
      references: {
        model: "posts",
        key: "post_id"
      }
    },
    user_id: {
      type: Sequelize.UUID,
      references: {
        model: "user_login",
        key: "user_id"
      }
    }
  }, {
    freezeTableName: true,
    tableName: 'post_likes'
  });
  return PostLikes;
};