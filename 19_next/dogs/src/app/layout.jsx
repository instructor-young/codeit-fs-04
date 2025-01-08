import "./globals.css";

export const metadata = {
  title: "Dog API",
};

export default function HTMLLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
