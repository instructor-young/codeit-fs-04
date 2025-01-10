"use client";

import Logo from "@/assets/svg/logo.svg";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const { isLoggedIn, logIn, logOut } = useAuth();

  const handleClickLogIn = () => {
    if (isLoggedIn) {
      logOut();
    } else {
      logIn();
    }
  };

  return (
    <header className="h-20 px-8 flex items-center justify-between">
      {/* 로고 */}
      <Link href="/" className="text-red-600 font-bold text-3xl">
        <Image
          src={Logo.src}
          width={120}
          height={33}
          alt="netflix"
          className="w-[120px] h-auto"
        />
      </Link>

      {/* 로그인 버튼 등 */}
      <div>
        <button onClick={handleClickLogIn} className="font-bold">
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
      </div>
    </header>
  );
}

export default Header;
