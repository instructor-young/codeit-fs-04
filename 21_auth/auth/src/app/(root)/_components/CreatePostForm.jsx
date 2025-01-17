"use client";

import { getToken } from "@/config/token";

function CreatePostForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const data = JSON.stringify({ title });
    const url = "http://localhost:3000/api/posts";
    const method = "POST";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    };

    // 쿠키와 관련한 어떠한 말도 한 적이 없음, 하지만 브라우저가 알아서 쿠키 묻혀서 감
    await fetch(url, { headers, method, body: data });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>글 작성하기</h2>
      <input
        name="title"
        className="border border-black"
        type="text"
        placeholder="글 제목"
      />
      <button className="border border-black">작성하기</button>
    </form>
  );
}

export default CreatePostForm;
