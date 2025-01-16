"use client";

import api from "@/api";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "./MovieCard";

function MovieSection({ title, category, initialData }) {
  const { data: movies } = useQuery({
    queryFn: () => api.getMovieList(category).then((data) => data.results),
    queryKey: ["movies", { category }],
    initialData,
  });

  return (
    <section className="[&+&]:mt-20">
      <h2 className={`px-8 text-3xl font-bold mb-6`}>{title}</h2>

      <ul className="px-8 flex gap-x-5 overflow-x-scroll scrollbar-hide">
        {movies.map((movie) => (
          <li key={movie.id} className="shrink-0">
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MovieSection;
