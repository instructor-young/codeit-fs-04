const express = require("express");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../../../db/prisma/client");

const router = express.Router();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, nickname, brief } = req.body;

    // Validations
    if (!validator.isEmail(email)) throw new Error("400/Wrong formatted email");
    if (!validator.isLength(password, { min: 8, max: 9999 }))
      throw new Error("400/Too short password");
    if (!nickname) throw new Error("400/Nickname is required");
    if (!brief) throw new Error("400/Brief is required");

    // 비밀번호 암호화
    const encryptedPassword = await bcrypt.hash(password, 12);

    // Data 준비
    const data = {
      email,
      encryptedPassword,
      nickname,
      brief,
    };

    // 회원가입 시키기
    const user = await prisma.user.create({
      data,
      omit: { encryptedPassword: true },
    });

    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
});

router.post("/log-in", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validations
    if (!validator.isEmail(email)) throw new Error("400/Wrong formatted email");
    if (!validator.isLength(password, { min: 8, max: 9999 }))
      throw new Error("400/Too short password");

    // 해당 Email의 사용자가 있는지 확인
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("404/No user found");

    // 비밀번호 비교
    const isPassswordCorrect = await bcrypt.compare(
      password,
      user.encryptedPassword
    );
    if (!isPassswordCorrect) throw new Error("400/Incorrect password");

    // AccesToken 생성
    const payload = {
      sub: user.id,
      email: user.email,
      nickname: user.nickname,
    };
    const accessToken = jwt.sign(payload, jwtSecretKey, { expiresIn: "2h" });
    const data = { accessToken };

    res.json(data);
  } catch (e) {
    next(e);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) throw new Error("401/Log in required");

    const { nickname, brief } = req.body;
    if (!validator.isLength(nickname, { min: 1, max: 20 }))
      throw new Error("400/Nickname length should be between 1 and 20");
    if (!validator.isLength(brief, { min: 1, max: 200 }))
      throw new Error("400/Brief length should be between 1 and 200");

    const user = await prisma.user.update({
      where: { id: userId },
      data: { nickname, brief },
      omit: { encryptedPassword: true },
    });

    res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        nickname: true,
        brief: true,
        tweets: { orderBy: { createdAt: "desc" } },
        _count: {
          select: {
            followings: true,
            followers: true,
          },
        },
      },
    });

    res.status(200).json(user);
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
