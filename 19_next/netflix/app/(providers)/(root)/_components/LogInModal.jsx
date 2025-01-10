"use client";

import api from "@/api";
import Modal from "@/components/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";

function LogInModal() {
  const { logIn } = useAuth();
  const modal = useModal();

  const handleClickLogIn = async () => {
    const isLoginSuccess = await api.logIn({
      email: "test@test.com",
      password: "test1234",
    });
    console.log("isLoginSuccess: ", isLoginSuccess);

    // logIn();
    // modal.close();
  };

  return (
    <Modal>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-center font-bold text-2xl mb-8">로그인하기</h2>

        <input
          type="email"
          className="border border-gray-400 px-5 py-2.5 rounded-lg w-full"
          placeholder="이메일"
        />
        <input
          type="password"
          className="mt-2 border border-gray-400 px-5 py-2.5 rounded-lg w-full"
          placeholder="비밀번호"
        />

        <button
          onClick={handleClickLogIn}
          className="bg-red-600 py-2.5 w-full rounded-lg text-white font-semibold mt-5"
        >
          로그인
        </button>
      </form>
    </Modal>
  );
}

export default LogInModal;
