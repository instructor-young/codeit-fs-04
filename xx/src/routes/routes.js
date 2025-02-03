const express = require("express");
const accountsRoutes = require("./accounts/accounts.routes");
const tweetsRoutes = require("./tweets/tweets.routes");

const router = express.Router();

router.use("/accounts", accountsRoutes);
router.use("/tweets", tweetsRoutes);

module.exports = router;
