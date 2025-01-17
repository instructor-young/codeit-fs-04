"use client";

import api from "@/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import { useEffect, useState } from "react";

function LogInModal() {
  const { logIn } = useAuth();
  const modal = useModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClickLogIn = async () => {
    const dto = { email, password };
    const isLoginSuccess = await api.logIn(dto);

    if (isLoginSuccess) {
      logIn();
      modal.close();
    } else {
      setError("이메일 또는 비밀번호가 잘못되었습니다");
    }
  };

  useEffect(() => {
    setError("");
  }, [email, password]);

  return (
    <Modal>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-center font-bold text-2xl mb-8">로그인하기</h2>

        <Input
          label="이메일"
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mb-2" />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm mt-2 text-red-500">{error}</p>}

        <Button
          onClick={handleClickLogIn}
          intent="primary"
          size="lg"
          className={"text-white w-full mt-4"}
        >
          로그인
        </Button>
      </form>
    </Modal>
  );
}

export default LogInModal;
