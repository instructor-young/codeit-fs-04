const tweet = require("./tweets.model");

async function tweetAuthorOnly(req, res, next) {
  try {
    const userId = req.userId;
    const tweetId = req.params.tweetId;

    const isAuthor = await tweet.checkIsAuthor(tweetId, userId);
    if (!isAuthor) throw new Error("400/Bad request");

    next();
  } catch (e) {
    next(e);
  }
}

module.exports = { tweetAuthorOnly };
