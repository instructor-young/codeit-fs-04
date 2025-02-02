const express = require("express");
const tweet = require("./tweets.model");
const { tweetAuthorOnly } = require("./tweets.middlewares");
const bookmark = require("../bookmarks/bookmarks.model");
const { loggedInOnly } = require("../index.middlewares");

const router = express.Router();

/**
 * 사용자와 유저는 전체 글을 최신순으로 읽을 수 있습니다.
 * 글에는 댓글도 함께 포함됩니다.
 */
router.get("/", async (req, res, next) => {
  try {
    const allTweets = await tweet.getAllTweets();

    res.json(allTweets);
  } catch (e) {
    next(e);
  }
});

/**
 * 유저는 글을 생성할 수 있습니다.
 */
router.post("/", loggedInOnly, async (req, res, next) => {
  try {
    const userId = req.userId;
    const { content } = req.body;
    const newTweet = await tweet.createTweet(userId, content);

    res.status(201).json(newTweet);
  } catch (e) {
    next(e);
  }
});

/**
 * 유저는 자신이 작성한 글을 수정할 수 있습니다.
 */
router.patch(
  "/:tweetId",
  loggedInOnly,
  tweetAuthorOnly,
  async (req, res, next) => {
    try {
      const tweetId = req.params.tweetId;
      const { content } = req.body;
      const updatedTweet = await tweet.editTweet(tweetId, content);

      res.status(200).json(updatedTweet);
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 유저는 자신이 작성한 글을 삭제할 수 있습니다.
 */
router.delete(
  "/:tweetId",
  loggedInOnly,
  tweetAuthorOnly,
  async (req, res, next) => {
    try {
      const tweetId = req.params.tweetId;
      await tweet.deleteTweet(tweetId);

      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
);

/**
 * 트윗 북마크하기
 */
router.post("/:tweetId/bookmarks", loggedInOnly, async (req, res, next) => {
  try {
    const userId = req.userId;
    const tweetId = req.params.tweetId;
    const newBookmark = await bookmark.bookmark(userId, tweetId);

    res.status(201).json(newBookmark);
  } catch (e) {
    next(e);
  }
});

/**
 * 트윗 북마크 해제하기
 */
router.delete("/:tweetId/bookmarks", loggedInOnly, async (req, res, next) => {
  try {
    const userId = req.userId;
    const tweetId = req.params.tweetId;
    await bookmark.unbookmark(userId, tweetId);

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
