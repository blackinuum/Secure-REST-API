const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  users.associate = (models) => {
    users.hasMany(models.posts, {
        as : "author",
        foreignKey : "userId",
        onDelete : "cascade"
    }),
    users.hasMany(models.comments , {
        onDelete : "cascade"
    }),
    users.belongsToMany(models.posts, {
      through: models.postLikes,
      as: "likedPosts",
      foreignKey: "userId",
    });
  }
  return users;
};
