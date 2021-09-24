const express = require("express");
const router = express.Router();
const auth = require("../controller/Auth");


router.post("/", auth.findUser);

router.get("/getUsers", auth.getUsers);

router.get("/logout", auth.logout);

router.post("/register", auth.createUser);

router.post("/login", auth.login);

module.exports = router;
