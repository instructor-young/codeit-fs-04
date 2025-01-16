import "./globals.css";

function HTMLLayout({ children }) {
  return (
    <html lang="ko">
      <body className={"antialiased"}>{children}</body>
    </html>
  );
}

export default HTMLLayout;
