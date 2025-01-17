import prismaClient from "@/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  const token = request.headers.get("authorization");
  // #1. token을 애초에 들고 오지 않았다면 로그인 안 되어 있는 것
  if (!token) return NextResponse.json("Unauthorized", { status: 401 });

  // #2. token의 유효성 검사
  try {
    const realToken = token.split("Bearer ")[1];
    console.log("realToken", realToken);

    const { userId } = jwt.verify(realToken, process.env.JWT_SECRET);

    // #3. 포스트 생성하기
    const { title } = (await request.json()) || {};
    const post = await prismaClient.post.create({
      data: { title, authorId: userId },
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json("Unauthorized", { status: 401 });
  }
}
