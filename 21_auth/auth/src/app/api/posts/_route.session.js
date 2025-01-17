import prismaClient from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const sessionId = request.cookies.get("sessionId")?.value;
  // #1. sessionId를 애초에 들고 오지 않았다면 로그인 안 되어 있는 것
  if (!sessionId) return NextResponse.json("Unauthorized", { status: 401 });

  const session = await prismaClient.session.findUnique({
    where: { id: sessionId },
  });
  // #2. sessionId가 DB에 존재하지 않으면 로그인 안 되어 있는 것
  if (!session) return NextResponse.json("Unauthorized", { status: 401 });

  // #3. session이 존재하므로 로그인한 사용자임. 따라서 포스트 생성하기
  const { title } = (await request.json()) || {};
  const post = await prismaClient.post.create({
    data: { title, authorId: session.userId },
  });

  return NextResponse.json(post, { status: 201 });
}
