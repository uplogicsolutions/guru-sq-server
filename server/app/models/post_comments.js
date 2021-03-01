module.exports = (sequelize, Sequelize) => {
  const PostComments = sequelize.define("post_comments", {
    comment_id: {
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
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'post_comments'
  });
  return PostComments;
};