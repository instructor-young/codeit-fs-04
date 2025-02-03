const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../db/prisma/client");

const jwtSecretKey = process.env.JWT_SECRET_KEY;

class User {
  async signUp(email, password, nickname, brief) {
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

    return user;
  }

  async checkIsEmailAndPasswordCorrect(email, password) {
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

    return { isCorrect: true, userId: user.id };
  }

  async createAccessToken(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const payload = {
      sub: user.id,
      email: user.email,
      nickname: user.nickname,
    };
    const accessToken = jwt.sign(payload, jwtSecretKey, { expiresIn: "2h" });

    return accessToken;
  }

  async updateProfile(userId, data) {
    const { nickname, brief } = data;

    if (!validator.isLength(nickname, { min: 1, max: 20 }))
      throw new Error("400/Nickname length should be between 1 and 20");
    if (!validator.isLength(brief, { min: 1, max: 200 }))
      throw new Error("400/Brief length should be between 1 and 200");

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { nickname, brief },
      omit: { encryptedPassword: true },
    });

    return updatedUser;
  }

  async getUserProfile(userId) {
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

    return user;
  }
}

const user = new User();

module.exports = user;
