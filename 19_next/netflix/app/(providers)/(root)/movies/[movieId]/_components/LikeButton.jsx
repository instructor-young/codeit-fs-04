"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const label = isLiked ? "찜 풀기" : "찜하기";
  const { isLoggedIn } = useAuth();

  const handleClick = () => {
    if (!isLoggedIn) return alert("로그인을 먼저 해 주세요");

    if (isLiked) {
      setIsLiked(false);
      alert("찜 풀었어요");
    } else {
      setIsLiked(true);
      alert("찜 했어요");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`bg-red-500 text-white w-full py-2.5 rounded-lg font-bold mt-5 hover:opacity-90 active:opacity-70 transition ${
        isLiked ? "!bg-white !text-black" : ""
      }`}
    >
      {label}
    </button>
  );
}

export default LikeButton;
