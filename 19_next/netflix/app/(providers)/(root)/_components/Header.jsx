"use client";

import Logo from "@/assets/svg/logo.svg";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "./AuthButton";

function Header() {
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
        <AuthButton />
      </div>
    </header>
  );
}

export default Header;
