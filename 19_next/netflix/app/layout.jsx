import "./globals.css";

export default function HTMLLayout({ children }) {
  return (
    <html lang="ko">
      <body className="antialiased bg-black">{children}</body>
    </html>
  );
}
