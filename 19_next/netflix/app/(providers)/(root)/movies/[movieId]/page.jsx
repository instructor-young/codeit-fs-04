import api from "@/api";
import MoviePage from "@/app/_pages/MoviePage";

async function _MoviePage(props) {
  const params = await props.params;
  const movieId = params.movieId;
  const movie = await api.getMovie(movieId);
  const movieComments = await api.getMovieComments(movieId);

  return (
    <MoviePage
      movieId={movieId}
      initialMovie={movie}
      initialMovieComments={movieComments}
    />
  );
}

export default _MoviePage;
