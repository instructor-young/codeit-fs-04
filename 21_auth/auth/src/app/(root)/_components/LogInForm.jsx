"use client";

import { setToken } from "@/config/token";
import Cookie from "cookie-universal";

function LogInForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = JSON.stringify({ email, password });
    const url = "http://localhost:3000/api/auth/log-in";
    const method = "POST";
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, { method, headers, body: data });
    const result = await response.json();
    const token = result.token;

    setToken(token);
  };

  const handleClickLogOut = () => {
    const cookies = Cookie();
    cookies.removeAll();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>로그인하기</h2>
      <input
        name="email"
        className="border border-black"
        type="text"
        placeholder="email"
      />
      <input
        name="password"
        className="border border-black"
        type="text"
        placeholder="password"
      />
      <button className="border border-black">로그인</button>
      <button
        onClick={handleClickLogOut}
        type="button"
        className="border border-black"
      >
        로그아웃
      </button>
    </form>
  );
}

export default LogInForm;
