module.exports = (sequelize, Sequelize) => {
  const Clusters = sequelize.define("clusters", {
    cluster_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    cluster_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    tableName: 'clusters'
  });
  return Clusters;
};