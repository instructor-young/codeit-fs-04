"use client";

import { createContext, useContext, useState } from "react";

// 1. 만든다
const ModalContext = createContext({});

// 2. 사용한다
export const useModal = () => useContext(ModalContext);

// 3. 범위를 지정해서 값을 내려준다.
export function ModalProvider({ children }) {
  const [modalElement, setModalElement] = useState(null);

  const open = (modalElement) => setModalElement(modalElement);
  const close = () => setModalElement(null);

  const value = {
    open,
    close,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalElement}
    </ModalContext.Provider>
  );
}
