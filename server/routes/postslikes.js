const express = require("express");
const router = express.Router();
const { posts, users , postLikes, sequelize } = require("../models");
const checkIfLogged = require("../middlewares/authentifiedCheck");

router.post("/addPostLike", async (req, res) => {
    const { postId, userId } = req.body;
  
    try {
      const existingLike = await postLikes.findOne({ where: { postId, userId } });
  
      if (existingLike) {
        await postLikes.destroy({ where: { postId, userId } });
        const action = 0;
        res.json(action);
      } else {
        await postLikes.create({ postId, userId });
        const action = 1;
        res.json(action);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  });
  
  router.get("/likedPosts", async (req, res) => {
    const  userId  = req.query.userId;
  
    try {
      const likedPosts = await posts.findAll({
        attributes: [
          "id",
          "title",
          "body",
          "userId",
          "createdAt",
          "updatedAt",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM postLikes WHERE posts.id = postLikes.postId)"
            ),
            "likes",
          ],
        ],
        include: [
          {
            model: sequelize.models.users,
            as: "likedBy", // Users who liked the post
            attributes: [],
            through: {
              attributes: [], // Exclude intermediary table fields
            },
            where: {
              id: userId, // Filter by userId
            },
          },
          {
            model: sequelize.models.users,
            as: "author", // Post's author
            attributes: ["id","username"],
          },
        ],
      });
      console.log(likedPosts);
      res.json(likedPosts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching liked posts." });
    }
  });
  
  
  module.exports = router;
  