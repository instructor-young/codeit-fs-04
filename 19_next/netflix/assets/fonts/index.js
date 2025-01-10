import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";

export const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// src에는 폰트의 파일시스템 상 상대경로를 적는다.
export const kkubulim = localFont({ src: "./BMKkubulim.otf" });
