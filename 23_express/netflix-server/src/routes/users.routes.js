const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

const router = express.Router();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

/**
 * 회원가입
 * [POST] /users/sign-up
 */
router.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password, nickname } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error("400/Registered email");

    const encryptedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: { email, encryptedPassword, nickname },
    });

    res.json(newUser);
  } catch (e) {
    next(e);
  }
});

/**
 * 로그인
 * [POST] /users/log-in
 */
router.post("/log-in", async (req, res, next) => {
  try {
    // 1. 이메일과 패스워드 꺼내기
    const { email, password } = req.body;

    // 2. 해당 이메일로 가입된 유저가 있는지 확인 -> 없으면 404
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) throw new Error("404/No user found");

    // 3. 해당 이메일로 가입된 유저가 있다면, 비밀번호 정확한지 확인 -> 정확하지 않으면 400
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.encryptedPassword
    );
    if (!isPasswordCorrect) throw new Error("400/Wrong password");

    // 4. 이메일과 패스워드 모두 정확할 경우에는, 응답에 유저 정보 실어 보내기
    // 토큰을 만들어서 바디에 실어 보낸다.
    const accessToken = jwt.sign({ sub: existingUser.id }, jwtSecretKey, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ sub: existingUser.id }, jwtSecretKey, {
      expiresIn: "2d",
    });
    const data = { accessToken, refreshToken };

    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    const { refreshToken: prevRefreshToken } = req.body;
    const { sub } = jwt.verify(prevRefreshToken, jwtSecretKey);
    const accessToken = jwt.sign({ sub }, jwtSecretKey, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ sub }, jwtSecretKey, {
      expiresIn: "2d",
    });
    const data = { accessToken, refreshToken };

    res.status(200).json(data);
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      const error = new Error("400/Invalid token");

      return next(error);
    }

    next(e);
  }
});

module.exports = router;
