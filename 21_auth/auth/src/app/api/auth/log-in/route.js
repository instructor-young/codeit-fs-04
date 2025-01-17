import prismaClient from "@/prisma";
import { NextResponse } from "next/server";

// 인증을 구현해 볼건데
// 세션 + 쿠키 방식으로 구현해 볼 거에요
// 세션(신분증의 형태), 쿠키(신분증을 넣고 다닐 곳)

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  // #1. 현재 email과 password가 일단 맞는지 확인
  const user = await prismaClient.user.findUnique({
    where: { email, password },
  });
  if (!user) return NextResponse.json("Not Found", { status: 404 });

  // #2. 현재 user로 이미 만들어져 있는 세션이 있는지 확인
  let session = await prismaClient.session.findUnique({
    where: { userId: user.id },
  });
  if (!session)
    session = await prismaClient.session.create({ data: { userId: user.id } });

  // #3. 세션의 id를 쿠키로 넣어 주기
  const sessionId = session.id; // 이 sessionId가 바로 신분증
  const headers = { "Set-Cookie": `sessionId=${sessionId}; path=/; HttpOnly;` };

  return NextResponse.json("OK", { headers });
}
