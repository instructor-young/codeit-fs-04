"use client";

import api from "@/api";
import Link from "next/link";
import { useState } from "react";

function PostList({ isLoading, posts, updatePosts }) {
  const [error, setError] = useState(null);

  if (isLoading) return <span>로딩 중...</span>;

  const handleClickDelete = async (postId) => {
    try {
      await api.deletePost(postId);

      updatePosts();
    } catch {
      setError("에러 발생...");
    }
  };

  if (error) return <div>에러 발생...</div>;

  return (
    <ul className="list-disc list-inside grid grid-cols-1 gap-y-4">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="underline text-blue-500 underline-offset-1"
          >
            {post.title}
          </Link>

          <button
            onClick={() => handleClickDelete(post.id)}
            className="ml-5 text-red-500"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
