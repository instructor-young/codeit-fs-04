const express = require("express");
const prisma = require("../../db/prisma/client");

const router = express.Router();

/**
 * 팔로우하기
 */
router.post("/:userId", async (req, res, next) => {
  try {
    const myId = req.userId;
    if (!myId) throw new Error("401/Log in required");

    const targetId = req.params.userId;
    const data = {
      followerId: myId,
      followedId: targetId,
    };

    const following = await prisma.following.create({ data });

    res.status(201).json(following);
  } catch (e) {
    next(e);
  }
});

/**
 * 언팔하기
 */
router.delete("/:userId", async (req, res, next) => {
  try {
    const myId = req.userId;
    if (!myId) throw new Error("401/Log in required");

    const targetId = req.params.userId;
    const where = {
      followerId: myId,
      followedId: targetId,
    };
    const following = await prisma.following.findFirst({ where });
    await prisma.following.delete({ where: { id: following.id } });

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

/**
 * 팔로우 취소 시키기
 */
router.delete("/:userId/ban", async (req, res, next) => {
  try {
    const myId = req.userId;
    if (!myId) throw new Error("401/Log in required");

    const targetId = req.params.userId;
    const where = {
      followerId: targetId,
      followedId: myId,
    };
    const following = await prisma.following.findFirst({ where });
    await prisma.following.delete({ where: { id: following.id } });

    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

module.exports = router;
