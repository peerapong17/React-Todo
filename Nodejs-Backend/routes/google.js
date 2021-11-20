const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    console.log(req.session.passport.user)
    const accessToken = jwt.sign({ id: req.session.passport.user }, process.env.LITTLE_SECRETE, {
      expiresIn: 60 * 60,
    });
    res.redirect(`http://localhost:3000/todo/${accessToken}`);
  }
);

module.exports = router;
