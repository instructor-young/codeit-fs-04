import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();
  const email = data.email;
  const password = data.password;

  if (email === "test@test.com" && password === "test1234")
    return NextResponse.json(true);

  return NextResponse.json(false);
}
