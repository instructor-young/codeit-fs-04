import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json("안녕하세요~");
}
