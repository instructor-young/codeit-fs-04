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
router.post("/sign-up", async (req, res) => {
  const { email, password, nickname } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).send("Already used email...");

  const encryptedPassword = await bcrypt.hash(password, 12);

  const newUser = await prisma.user.create({
    data: { email, encryptedPassword, nickname },
  });

  res.json(newUser);
});

/**
 * 로그인
 * [POST] /users/log-in
 */
router.post("/log-in", async (req, res) => {
  // 1. 이메일과 패스워드 꺼내기
  const { email, password } = req.body;

  // 2. 해당 이메일로 가입된 유저가 있는지 확인 -> 없으면 404
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) return res.status(404).send("Not Found");

  // 3. 해당 이메일로 가입된 유저가 있다면, 비밀번호 정확한지 확인 -> 정확하지 않으면 400
  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.encryptedPassword
  );
  if (!isPasswordCorrect) return res.status(400).send("Bad Request");

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
});

router.post("/refresh-token", async (req, res) => {
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
});

module.exports = router;
