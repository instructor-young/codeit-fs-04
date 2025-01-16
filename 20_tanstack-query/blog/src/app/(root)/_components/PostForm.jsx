"use client";

import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function PostForm() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (newPost) => api.createPost(newPost),
    onSuccess: () => {
      setTitle("");
      setContent("");

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = { title, content };

    mutate(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-5">게시글 작성하기</h2>

      <input
        type="text"
        placeholder="제목을 입력해 주세요"
        className="border w-full p-4 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="게시글 내용을 입력해 주세요"
        className="border w-full p-4 rounded mt-4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="mt-4 bg-black text-white px-5 py-2.5 font-semibold rounded">
        게시글 생성하기
      </button>
    </form>
  );
}

export default PostForm;
