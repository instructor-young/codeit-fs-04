import prismaClient from "@/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// 인증을 구현해 볼건데
// 토큰 + 쿠키 방식으로 구현해 볼 거에요
// 토큰(신분증의 형태), 쿠키(신분증을 넣고 다닐 곳)

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  // #1. 현재 email과 password가 일단 맞는지 확인
  const user = await prismaClient.user.findUnique({
    where: { email, password },
  });
  if (!user) return NextResponse.json("Not Found", { status: 404 });

  // #2. 토큰을 그냥 데이터로 전달하기
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  const data = { token };

  return NextResponse.json(data);
}
