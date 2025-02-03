const express = require("express");
const followingsRoutes = require("./followings/followings.routes");
const accountsRoutes = require("./accounts/accounts.routes");
const tweetsRoutes = require("./tweets/tweets.routes");

const router = express.Router();

router.use("/followings", followingsRoutes);
router.use("/accounts", accountsRoutes);
router.use("/tweets", tweetsRoutes);

module.exports = router;
