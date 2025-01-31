"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import Link from "next/link";
import LogInModal from "./LogInModal";

function AuthButton() {
  const { isAuthInitialized, isLoggedIn, logOut } = useAuth();
  const modal = useModal();

  const handleClickLogIn = () => {
    modal.open(<LogInModal />);
  };

  if (!isAuthInitialized) return null;

  if (isLoggedIn)
    return (
      <div className="flex items-center gap-x-5">
        <Link href="/my/reviews" className="font-bold">
          내 리뷰
        </Link>
        <Link href="/my/account" className="font-bold">
          내 계정
        </Link>
        <button onClick={logOut} className="font-bold">
          로그아웃
        </button>
      </div>
    );

  return (
    <div className="flex items-center gap-x-5">
      <Link href="/auth/sign-up" className="font-bold">
        회원가입
      </Link>
      <button onClick={handleClickLogIn} className="font-bold">
        로그인
      </button>
    </div>
  );
}

export default AuthButton;
