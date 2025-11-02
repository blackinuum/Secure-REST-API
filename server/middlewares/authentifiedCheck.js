const express = require("express");
const { verify } = require("jsonwebtoken");
const checkIfLogged = async (req, res, next) => {
  const badge = req.header("badge");
  if (!badge) {
    console.log("There is no badge !");
    res.json({error : "You dont have a badge !"});
  } else {
    try {
      const checkingBadgeValidity = await verify(
        badge,
        "nigKU5eVBqWwPsllz9PuOZIbzSkuZ38U"
      );
        if (checkingBadgeValidity) {
          console.log("You can go !");
          return next();
        }

    } catch (error) {
      console.log("Your badge is not valid !");
      res.json({error : "Your badge is not valid !"});
    }
  }
};
module.exports = checkIfLogged;
