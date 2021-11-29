const express = require("express");
const router = express.Router();
const auth = require("../controller/Auth");
const passport = require("passport");

router.post("/", auth.findUser);

router.get("/getUsers", auth.getUsers);

router.get("/logout", auth.logout);

router.post("/register", auth.createUser);

router.post("/login", auth.login);

router.get(
  "/user-profile",
  passport.authenticate("jwt", { session: false }),
  auth.getUserProfile
);

module.exports = router;
