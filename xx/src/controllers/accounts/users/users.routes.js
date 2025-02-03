const express = require("express");
const validator = require("validator");
const prisma = require("../../../db/prisma/client");
const user = require("../../../models/user.model");
const loggedInOnly = require("../../../middlewares/loggedInOnly.middleware");

const router = express.Router();

/**
 * 회원가입
 */
router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, nickname, brief } = req.body;
    const newUser = await user.signUp(email, password, nickname, brief);

    res.status(201).json(newUser);
  } catch (e) {
    next(e);
  }
});

/**
 * 로그인
 */
router.post("/log-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { isCorrect, userId } = await user.checkIsEmailAndPasswordCorrect(
      email,
      password
    );
    if (!isCorrect) throw new Error();

    const accessToken = await user.createAccessToken(userId);

    res.json({ accessToken });
  } catch (e) {
    next(e);
  }
});

/**
 * 프로필 수정
 */
router.put("/", loggedInOnly, async (req, res, next) => {
  try {
    const userId = req.userId;
    const updatedUser = await user.updateProfile(userId, req.body);

    res.status(200).json(updatedUser);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const userProfile = user.getUserProfile(userId);

    res.status(200).json(userProfile);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/followings", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followings: {
          select: { followed: { select: { nickname: true, brief: true } } },
        },
      },
    });
    const result = user.followings.map((following) => following.followed);

    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/followers", async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          select: { follower: { select: { nickname: true, brief: true } } },
        },
      },
    });
    const result = user.followers.map((follower) => follower.follower);

    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/bookmarks", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookmarks = await prisma.bookmark.findMany({ where: { userId } });

    res.json(bookmarks);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
