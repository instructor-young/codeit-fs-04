import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = (await request.json()) || {};

  // 입력한 email의 유저가 있는지 우선 확인
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json("No user found", { status: 404 });

  // 비밀번호가 일치하는지 확인
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.encryptedPassword
  );
  if (!isPasswordCorrect)
    return NextResponse.json("Wrong password", { status: 400 });

  // 토큰을 만들어서 바디에 실어 보낸다.
  const accessToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "5m" }
  );
  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2d" }
  );

  const data = { accessToken, refreshToken };

  return NextResponse.json(data);
}
