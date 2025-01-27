const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const users = [];

/**
 * 회원가입
 * [POST] /users/sign-up
 */
router.post("/sign-up", async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 12);
  const newUser = { email, encryptedPassword };

  users.push(newUser);

  res.json(newUser);
});

/**
 * 로그인
 * [POST] /users/log-in
 */
router.post("/log-in", (req, res) => {
  // 1. 이메일과 패스워드 꺼내기
  // 2. 해당 이메일로 가입된 유저가 있는지 확인 -> 없으면 404
  // 3. 해당 이메일로 가입된 유저가 있다면, 비밀번호 정확한지 확인 -> 정확하지 않으면 400
  // 4. 이메일과 패스워드 모두 정확할 경우에는, 응답에 유저 정보 실어 보내기
});

module.exports = router;
