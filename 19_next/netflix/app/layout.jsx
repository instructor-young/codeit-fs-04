import { notoSansKr } from "@/assets/fonts";
import "./globals.css";

export default function HTMLLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
          integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              Kakao.init('0143d99a7c0ffa34a063003d0211f13c');
            `,
          }}
        />
      </head>
      <body className={`antialiased bg-black ${notoSansKr.className}`}>
        {children}
      </body>
    </html>
  );
}
