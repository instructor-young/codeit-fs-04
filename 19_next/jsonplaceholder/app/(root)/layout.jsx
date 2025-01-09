import Link from "next/link";

function RootLayout({ children }) {
  return (
    <>
      <header>
        <Link href="/" className="h1 text-warning">
          JSONPlaceholder
        </Link>
      </header>

      {children}
    </>
  );
}

export default RootLayout;
