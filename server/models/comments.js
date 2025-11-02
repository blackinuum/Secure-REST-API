const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define("comments", {
   content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  comments.associate = (models) => {
    comments.belongsTo(models.posts);
    comments.belongsTo(models.users);
  } 
  return comments;
};
