module.exports = (sequelize, Sequelize) => {
  const Posts = sequelize.define("posts", {
    post_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.UUID,
      references: {
        model: "user_login",
        key: "user_id"
      }
    },
    post_type: {
      type: Sequelize.ENUM,
      values: ['text', 'image', 'video', 'audio'],
      allowNull: false
    },
    post_url: {
      type: Sequelize.STRING,
      allowNull: true
    },
    post_description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    visibility: {
      type: Sequelize.ENUM,
      values: ['public', 'private', 'friends'],
      allowNull: false
    }
  }, {
    freezeTableName: true,
    tableName: 'posts'
  });
  return Posts;
};