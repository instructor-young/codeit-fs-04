import Link from "next/link";

function Header() {
  return (
    <header className="border-b">
      <div className="h-14 flex items-center px-5 max-w-screen-sm mx-auto">
        <Link href="/" className="font-bold text-lg">
          내 블로그
        </Link>
      </div>
    </header>
  );
}

export default Header;
