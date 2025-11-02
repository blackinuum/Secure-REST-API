const { users } = require("../models");
const express = require("express");
const router = express.Router();
const crypter = require("bcrypt");
const { sign } = require("jsonwebtoken");
const checkUserBadge = require("../middlewares/authentifiedCheck");
const checkIfLogged = require("../middlewares/authentifiedCheck");

router.post("/authentification", async (req, res) => {
  const user = req.body;
  const searchedUser = await users.findOne({
    where: { username: user.username },
  });
  if (searchedUser) {
    await crypter
      .compare(user.password, searchedUser.password)
      .then((response) => {
        if (response) {
          const badge = sign(
            {
              id : searchedUser.id,
              username: user.username,
              password: user.password,
            },
            "nigKU5eVBqWwPsllz9PuOZIbzSkuZ38U"
          );
          res.json(badge);
        } else {
          res.json({error : "Infos Invalid"});
        }
      });
  } else {
    res.json( {error :"User Invalid"});
  }
});
router.post("/checkUser",checkIfLogged,async (req,res) => {
  res.json({authorized : true});
})
router.post("/addUser", async (req, res) => {
  const { username, password } = req.body;
  crypter.hash(password, 10).then(async (hashedSecret) => {
    await users.create({ username: username, password: hashedSecret });
  });
  res.json({ success: true, message: "User created successfully!" });
});

module.exports = router;
