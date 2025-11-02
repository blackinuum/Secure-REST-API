const express = require("express");
const router = express.Router();
const { posts, users , postLikes, sequelize } = require("../models");
const checkIfLogged = require("../middlewares/authentifiedCheck");
const { sign } = require("jsonwebtoken");
const { SignJWT , jwtVerify } = require("jose");

const secret = new TextEncoder().encode("47e3a94b4b638da8dc853cd00c6dd9abb12bc62e50bb284708e2567b66a8d3eb13c182ba9f780832139fcbedfbae01ad2538c72b2c0f65e70ffaddb75095595c93a5bb23454538a31044e076aece2bdabd33efa3698054fe900b2f701371f10269e43df57ce9057b1d061e14a3cb16854c6caf8109238959c755b113d20792fc1c6ffb02bb82125f4463293595d15b66b22ba10f5330abe2bbce07d86dedbb5c6e06c2a32535325fb3f3775f592050832ec22db0e33ab64ca9ab29c3ea7f70c5203e221446bb62bee0eed8e2301249fb25e488144729be2fc9a36d9f6be2898cca2ac0922732f688c0d9d5d5a43dc8694f2eed03abe15e0a0f318793e05fc02a");

const signPayload = async (payload) => {

    try {
      const signature = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);

      return signature;

    } catch (error) {
      console.error("Error signing JWS:", error);
    }
  };

//select posts.id,posts.title,posts.body,posts.createdAt,posts.updatedAt,users.username,count(postlikes.postId) as likes from posts left join postlikes on posts.id = postlikes.postId join users on users.id = posts.userId group by posts.id;
/*router.post("/addPost" ,async (req, res) => {
  const post = req.body;
  await posts.create(post);
  res.json("Post added successfully ! ");
});*/

router.post("/addPost", async (req, res) => {
  const post = req.body.data;
  const jws = req.body.signature;

  const recievedPayload_jws = await signPayload(post);

  if(recievedPayload_jws === jws){
    await posts.create(post); // This will now store the modified data
    res.json({ success: true, message: "User created successfully!" });
  }else{
    res.json({ success: false, message: "MitM attempt, please try again later !" });
  }

});

router.get("/postsList", async (req, res) => {
  const post = await posts.findAll({
    attributes : ['id','title','body', 'userId' , 'createdAt' ,'updatedAt',[sequelize.literal('(SELECT COUNT(*) FROM postlikes WHERE posts.id = postlikes.postId)'), 'likes']],
    include: [
      {
        model: users,
        as : "author",
        attributes: ["username"],
      },
    ],
  });
  res.json(post);
});
router.get("/myPosts", async (req, res) => {
  const userId = req.query.userId;
  const post = await posts.findAll({ where: { userId: userId }  , 
    attributes : ['id','title','body', 'userId' , 'createdAt' ,'updatedAt',[sequelize.literal('(SELECT COUNT(*) FROM postlikes WHERE posts.id = postlikes.postId)'), 'likes']],
    include: [
      {
        model: users,
        as : "author",
        attributes: ["username"],
      },
    ],
  });
  res.json(post);
});

module.exports = router;
