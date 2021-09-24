const express = require("express");
const router = express.Router();
const pass = require("../controller/Pass");

router.post("/enter-email", pass.enterEmail);

router.post("/enter-new-password/:userId/:token", pass.enterPassword);

module.exports = router;
