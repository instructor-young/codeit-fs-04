import prismaClient from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password)
    return NextResponse.json("Bad Request", { status: 400 });

  try {
    await prismaClient.user.create({ data: { email, password } });
  } catch (e) {
    console.log(e.message);
    return NextResponse.json("Bad Request", { status: 400 });
  }

  return NextResponse.json("OK");
}
