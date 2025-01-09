import MovieCard from "./MovieCard";

function MovieSection({ title, movies }) {
  return (
    <section className="[&+&]:mt-20">
      <h2 className="px-8 text-3xl font-bold mb-6">{title}</h2>

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
