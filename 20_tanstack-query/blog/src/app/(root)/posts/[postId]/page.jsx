"use client";

import api from "@/api";
import Page from "@/components/Page";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function PostDetailPage() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const params = useParams();
  const postId = params.postId;

  const loadPost = async () => {
    try {
      setIsLoading(true);
      const post = await api.getPost(postId);

      setPost(post);
    } catch {
      setError("에러 발생...");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitEditingForm = async (e) => {
    e.preventDefault();

    const post = { title, content };

    await api.updatePost(postId, post);

    setIsEditing(false);

    loadPost();
  };

  const handleClickDelete = async () => {
    await api.deletePost(postId);

    router.push("/");
  };

  useEffect(() => {
    loadPost();
  }, []);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (error) return <Page>{error}</Page>;
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
        <button onClick={handleClickDelete} className="text-red-500">
          삭제
        </button>
      </div>
    </Page>
  );
}

export default PostDetailPage;
