"use client";

import api from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function HomePage() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const {
    data: books,
    isLoading,
    isError,
  } = useQuery({
    queryFn: api.getBooks,
    queryKey: ["books"],
    initialData: [],
  });

  const { mutate: addBook } = useMutation({
    mutationFn: api.addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  if (isLoading) return "로딩 중...";
  if (isError) return "에러 발생...";

  const handleClickAddBook = () => {
    const newBook = { title };
    addBook(newBook);
  };

  return (
    <div className="p-5">
      <h2 className="text-lg font-bold mb-5">책 추가하기</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="책 제목"
        type="text"
        className="border"
      />
      <button onClick={handleClickAddBook} className="border">
        추가하기
      </button>

      <hr className="my-10" />

      <h2 className="text-lg font-bold mb-5">보유 중인 책 목록</h2>

      <ul className="list-disc list-inside">
        {books.map((book) => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
