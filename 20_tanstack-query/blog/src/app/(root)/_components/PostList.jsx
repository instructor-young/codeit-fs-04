"use client";

import api from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

function PostList({ isLoading, posts }) {
  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation({
    mutationFn: (postId) => api.deletePost(postId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

  if (isLoading) return <span>로딩 중...</span>;
  if (isError) return <span>에러 발생...</span>;

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

          <button onClick={() => mutate(post.id)} className="ml-5 text-red-500">
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
