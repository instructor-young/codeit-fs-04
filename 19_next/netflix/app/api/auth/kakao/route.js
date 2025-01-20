import prisma from "@/prisma/client";
import axios from "axios";
import { NextResponse } from "next/server";

/**
 * [1. 위 코드를 가지고, "카카오에 유저 정보를 요청할 수 있는 토큰"을 요청](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#request-token)
 * [2. 토큰을 가지고 카카오에 유저 정보를 요청](https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info)
 */
export async function GET(request) {
  try {
    const code = request.nextUrl.searchParams.get("code");

    // 1. 위 코드를 가지고, "카카오에 유저 정보를 요청할 수 있는 토큰"을 요청
    const response = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      undefined,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: {
          grant_type: "authorization_code",
          client_id: process.env.KAKAO_REST_KEY,
          redirect_uri: request.nextUrl.origin + request.nextUrl.pathname,
          code,
        },
      }
    );
    const kakaoAccessToken = response.data.access_token;

    // 2. 토큰을 가지고 카카오에 유저 정보를 요청
    const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        Authorization: `Bearer ${kakaoAccessToken}`,
      },
    });

    const providerName = "kakao";
    const providerId = String(data.id);

    const user = await prisma.user.findUnique({
      where: { providerName_providerId: { providerName, providerId } },
    });
    if (!user)
      user = await prisma.user.create({ data: { providerName, providerId } });

    return NextResponse.redirect(request.nextUrl.origin);
  } catch (e) {
    console.log(e.message);
    return NextResponse.json("OK");
  }
}
