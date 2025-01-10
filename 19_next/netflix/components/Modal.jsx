"use client";

import close from "@/assets/img/close.png";
import { useModal } from "@/contexts/ModalContext";
import Image from "next/image";

function Modal({ children }) {
  const modal = useModal();

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/70 flex items-center justify-center">
      <div className="bg-white w-[400px] p-10 text-black rounded-lg drop-shadow-xl relative">
        <button className="absolute right-6 top-6" onClick={modal.close}>
          <Image alt="모달창 닫기" src={close} width={20} height={20} />
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
