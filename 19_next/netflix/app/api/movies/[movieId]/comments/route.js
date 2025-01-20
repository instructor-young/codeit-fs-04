import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { extractUserIdFromRequest } from "../like/route";

export async function GET(_, context) {
  try {
    const params = await context.params;
    const movieId = Number(params.movieId);
    const movieComments = await prisma.movieComment.findMany({
      where: { movieId },
      include: { user: { select: { email: true } } },
    });

    return NextResponse.json(movieComments);
  } catch (e) {
    console.log(e.message);

    return NextResponse.json("Internal server error", { status: 500 });
  }
}

export async function POST(request, context) {
  try {
    const params = await context.params;
    const movieId = Number(params.movieId);
    const { content } = await request.json();
    const userId = await extractUserIdFromRequest(request);
    const data = { movieId, userId, content };
    const movieComment = await prisma.movieComment.create({ data });

    return NextResponse.json(movieComment);
  } catch (e) {
    console.log(e.message);

    return NextResponse.json("Internal server error", { status: 500 });
  }
}
