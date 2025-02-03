const express = require("express");
const prisma = require("../../db/prisma/client");

const router = express.Router();

/**
 * 사용자와 유저는 전체 글을 최신순으로 읽을 수 있습니다.
 * 글에는 댓글도 함께 포함됩니다.
 */
router.get("/", async (req, res, next) => {
  try {
    const tweets = await prisma.tweet.findMany({
      include: { comments: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(tweets);
  } catch (e) {
    next(e);
  }
});

/**
 * 유저는 글을 생성할 수 있습니다.
 */
router.post("/", async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new Error("401/Log-In required");

    const { content } = req.body;
    const data = {
      authorId: userId,
      content,
    };
    const tweet = await prisma.tweet.create({ data });

    res.status(201).json(tweet);
  } catch (e) {
    next(e);
  }
});

/**
 * 유저는 자신이 작성한 글을 수정할 수 있습니다.
 */
router.patch("/:tweetId", async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new Error("401/Log in required");

    const tweetId = req.params.tweetId;
    const tweet = await prisma.tweet.findFirst({
      where: { AND: { id: tweetId, authorId: userId } },
    });
    if (!tweet) throw new Error("400/Bad request");

    const content = req.body.content;
    const data = { content };
    const updatedTweet = await prisma.tweet.update({
      where: { id: tweetId },
      data,
    });

    res.status(200).json(updatedTweet);
  } catch (e) {
    next(e);
  }
});

/**
 * 유저는 자신이 작성한 글을 삭제할 수 있습니다.
 */
router.delete("/:tweetId", async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new Error("401/Log in required");

    const tweetId = req.params.tweetId;
    const tweet = await prisma.tweet.delete({
      where: { id: tweetId, authorId: userId },
    });
    if (!tweet) throw new Error("400/Bad request");

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

router.post("/:tweetId/bookmarks", async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new Error("401/Log in required");

    const tweetId = req.params.tweetId;
    const bookmark = await prisma.bookmark.create({
      data: { tweetId, userId },
    });

    res.status(201).json(bookmark);
  } catch (e) {
    next(e);
  }
});

router.delete("/:tweetId/bookmarks", async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new Error("401/Log in required");

    const tweetId = req.params.tweetId;
    await prisma.bookmark.delete({
      where: { userId_tweetId: { userId, tweetId } },
    });

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
