import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  // refreshToken의 유효성 검사 (우리가 발행한 그대로가 맞는지. 위변조 된 건 아닌지)
  try {
    const { refreshToken: prevRefreshToken } = await request.json();
    const { sub } = jwt.verify(prevRefreshToken, process.env.JWT_SECRET_KEY);
    const accessToken = jwt.sign({ sub }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ sub }, process.env.JWT_SECRET_KEY, {
      expiresIn: "2d",
    });
    const data = { accessToken, refreshToken };

    return NextResponse.json(data);
  } catch (e) {
    console.log(e.message);

    return NextResponse.json("Bad request", { status: 400 });
  }
}
