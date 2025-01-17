import { getDB } from "@/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = (await request.json()) || {};
  const db = getDB();

  // 입력한 email의 유저가 있는지 우선 확인
  const user = db.users.find((user) => user.email === email);
  if (!user) return NextResponse.json("No user found", { status: 404 });

  // 비밀번호가 일치하는지 확인
  if (user.password !== password)
    return NextResponse.json("Wrong password", { status: 400 });

  // 토큰을 만들어서 바디에 실어 보낸다.
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {
    expiresIn: "5m",
  });
  const data = { token };

  return NextResponse.json(data);
}
