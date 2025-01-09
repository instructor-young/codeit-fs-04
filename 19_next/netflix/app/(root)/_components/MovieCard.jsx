import Image from "next/image";

function MovieCard({ movie }) {
  return (
    <article>
      <div className="relative w-96 aspect-video">
        <Image
          alt={movie.title}
          fill
          src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
          className="object-cover"
        />
      </div>
      <h6 className="mt-2.5 text-2xl font-semibold">{movie.title}</h6>
    </article>
  );
}

export default MovieCard;
