const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const postLikes = sequelize.define("postLikes", {
    // Additional fields (if needed) can be added here
  });

  postLikes.associate = (models) => {
    postLikes.belongsTo(models.posts, { foreignKey: "postId" });
    postLikes.belongsTo(models.users, { foreignKey: "userId" });
  };
  

  return postLikes;
};
