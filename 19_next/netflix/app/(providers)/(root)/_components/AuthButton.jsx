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
      <button onClick={logOut} className="font-bold">
        로그아웃
      </button>
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
