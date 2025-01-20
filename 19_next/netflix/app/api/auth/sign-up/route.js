import { USER_SALT_ROUNDS } from "@/config";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = (await request.json()) || {};
  if (!email || !password)
    return NextResponse.json("Invalid input", { status: 400 });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return NextResponse.json("Already used email", { status: 400 });

  const encryptedPassword = await bcrypt.hash(password, USER_SALT_ROUNDS);
  const data = { email, encryptedPassword };

  await prisma.user.create({ data });

  return NextResponse.json("OK");
}
