"use client";

import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import { useState } from "react";
import LogInModal from "../../../_components/LogInModal";

function LikeButton() {
  const [isLiked, setIsLiked] = useState(false);
  const label = isLiked ? "찜 풀기" : "찜 하기";
  const { isLoggedIn } = useAuth();
  const modal = useModal();

  const handleClick = () => {
    if (!isLoggedIn) return modal.open(<LogInModal />);

    if (isLiked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      intent={isLiked ? "white" : "primary"}
      className={"w-full mt-4"}
    >
      {label}
    </Button>
  );
}

export default LikeButton;
