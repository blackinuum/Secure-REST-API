const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const posts = sequelize.define("posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  posts.associate = (models) => {
    posts.hasMany(models.comments, {
      onDelete: "cascade",
    });

    posts.belongsTo(models.users , {as : "author", foreignKey : "userId"});

    // Associate posts with users through the postLikes model
    posts.belongsToMany(models.users, {
      through: models.postLikes,
      as: "likedBy",
      foreignKey: "postId", // Foreign key in postLikes table for posts
    });
  };

  return posts;
};
