import { getDB } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = (await request.json()) || {};

  const db = getDB();

  // 이미 동일한 이메일로 가입한 계정이 있는지 확인
  const existingUser = db.users.find((user) => user.email === email);
  if (existingUser)
    return NextResponse.json("Already used email", { status: 400 });

  const newUser = { email, password };
  db.users.push(newUser);

  console.log("db", db);

  return NextResponse.json("OK");
}
