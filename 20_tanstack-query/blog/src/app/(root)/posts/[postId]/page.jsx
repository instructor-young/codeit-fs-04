"use client";

import api from "@/api";
import Page from "@/components/Page";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PostDetailPage() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const params = useParams();
  const postId = params.postId;

  const { data: post } = useQuery({
    queryFn: () => api.getPost(postId),
    queryKey: ["post", { postId }],
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: () => api.deletePost(postId),
    onSuccess: () => router.replace("/"),
  });

  const { mutate: updatePost } = useMutation({
    mutationFn: (updatedPost) => api.updatePost(postId, updatedPost),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["post", { postId }] });
    },
  });

  const handleSubmitEditingForm = async (e) => {
    e.preventDefault();

    const updatedPost = { title, content };
    updatePost(updatedPost);
  };

  useEffect(() => {
    if (isEditing) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [isEditing]);

  if (isLoading) return <Page>로딩 중...</Page>;
  if (isEditing)
    return (
      <Page>
        <form onSubmit={handleSubmitEditingForm}>
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
            수정하기
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-4 bg-black text-white px-5 py-2.5 font-semibold rounded"
          >
            취소
          </button>
        </form>
      </Page>
    );

  return (
    <Page>
      <h1 className="text-3xl font-bold mb-5">{post?.title}</h1>

      <p>{post?.content}</p>

      <div className="flex items-center gap-x-4 mt-5">
        <button onClick={() => setIsEditing(true)} className="text-blue-500">
          수정
        </button>
        <button onClick={deletePost} className="text-red-500">
          삭제
        </button>
      </div>
    </Page>
  );
}

export default PostDetailPage;
