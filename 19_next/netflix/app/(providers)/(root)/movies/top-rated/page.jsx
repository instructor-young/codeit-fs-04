"use client";

import api from "@/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

function TopRatedMoviesPage() {
  const targetRef = useRef(null);

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryFn: ({ pageParam }) => api.movies.getMovieList("top_rated", pageParam),
    queryKey: ["movies", { category: "top_rated", isInfinite: true }],
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];
      if (entry.isIntersecting) fetchNextPage();
    });

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [data]);

  const movies = data?.pages.flatMap((page) => page.results) || [];

  if (isLoading) return "로딩 중...";

  return (
    <main className="mx-auto max-w-screen-sm px-8 py-10">
      <h1 className="text-3xl font-bold">평점이 높은 영화 목록</h1>

      <ol
        start={(1 - 1) * 10 + 1}
        className="mt-10 text-lg grid gap-y-5 list-decimal list-inside"
      >
        {movies.map((movie, index) => (
          <li
            ref={index === movies.length - 6 ? targetRef : undefined}
            key={movie.id}
          >
            {movie.title}
          </li>
        ))}
      </ol>
    </main>
  );
}

export default TopRatedMoviesPage;
