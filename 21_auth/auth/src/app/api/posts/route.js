import { NextResponse } from "next/server";

export async function POST(request) {
  const identification = request.cookies.get("identification")?.value;

  if (identification !== "codeit")
    return NextResponse.json("Unauthorized", { status: 401 });

  return NextResponse.json("OK");
}
