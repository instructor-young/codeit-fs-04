"use client";

import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { useModal } from "@/contexts/ModalContext";
import clsx from "clsx";
import { useState } from "react";
import LogInModal from "../../../_components/LogInModal";

function MovieComments() {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [orderedByCreatedAt, setOrderedByCreatedAt] = useState("desc");
  const { isLoggedIn } = useAuth();
  const modal = useModal();

  const orderedComments = [...comments].sort((aComment, bComment) =>
    orderedByCreatedAt === "asc"
      ? aComment.createdAt - bComment.createdAt
      : bComment.createdAt - aComment.createdAt
  );

  const handleSubmitComment = () => {
    if (!isLoggedIn) return modal.open(<LogInModal />);

    if (commentContent === "") return;

    const comment = {
      id: Date.now(),
      author: {
        email: "test@test.com",
      },
      content: commentContent,
      createdAt: Date.now(),
    };

    setComments([...comments, comment]);

    setCommentContent("");
  };

  return (
    <section className="w-full max-w-screen-lg mx-auto px-8">
      <h5 className="text-xl font-bold">감상평 ({comments.length}개)</h5>

      <form className="mt-5 flex flex-col" onSubmit={(e) => e.preventDefault()}>
        <textarea
          placeholder="이곳에 감상평을 남겨주세요"
          className="w-full border rounded-lg p-5 text-black resize-none"
          rows={3}
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <Button
          onClick={handleSubmitComment}
          intent="white"
          className="self-end mt-4"
        >
          등록하기
        </Button>
      </form>

      <hr className="my-8" />

      <div className="flex gap-x-2 mb-5">
        <button
          onClick={() => setOrderedByCreatedAt("desc")}
          className={clsx({ "font-black": orderedByCreatedAt === "desc" })}
        >
          최신 순
        </button>
        <button
          onClick={() => setOrderedByCreatedAt("asc")}
          className={clsx({ "font-black": orderedByCreatedAt === "asc" })}
        >
          오래된 순
        </button>
      </div>

      <ol className="grid gap-y-4">
        {orderedComments.map((comment) => (
          <li key={comment.id} className="bg-black/50 p-5 rounded-lg">
            <span className="text-sm font-bold mb-4 inline-block">
              {comment.author.email}
            </span>
            <p>{comment.content}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default MovieComments;
