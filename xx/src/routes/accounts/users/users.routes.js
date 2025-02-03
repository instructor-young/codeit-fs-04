const express = require("express");
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
    const followings = await user.getFollowingsOfUser(userId);

    res.json(followings);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/followers", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const followers = await user.getFollowersOfUser(userId);

    res.json(followers);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId/bookmarks", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const bookmarks = user.getBookmarksOfUser(userId);

    res.json(bookmarks);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
