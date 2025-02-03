const express = require("express");
const prisma = require("../../db/prisma/client");
const loggedInOnly = require("../../middlewares/loggedInOnly.middleware");
const user = require("../../models/user.model");

const router = express.Router();

/**
 * 팔로우하기
 */
router.post("/:userId", loggedInOnly, async (req, res, next) => {
  try {
    const myId = req.userId;
    const targetId = req.params.userId;
    const following = await user.follow(myId, targetId);

    res.status(201).json(following);
  } catch (e) {
    next(e);
  }
});

/**
 * 언팔하기
 */
router.delete("/:userId", loggedInOnly, async (req, res, next) => {
  try {
    const myId = req.userId;
    const targetId = req.params.userId;

    await user.unfollow(myId, targetId);

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

/**
 * 팔로우 취소 시키기
 */
router.delete("/:userId/ban", loggedInOnly, async (req, res, next) => {
  try {
    const myId = req.userId;
    const targetId = req.params.userId;

    await user.banFollower(myId, targetId);

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
