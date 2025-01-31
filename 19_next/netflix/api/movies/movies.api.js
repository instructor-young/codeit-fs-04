import clients from "../clients";

const getMovieList = async (category, page = 1) => {
  const url = `/movie/${category}`;
  const response = await clients.tmdb.get(url, { params: { page } });
  const data = response.data;

  return data;
};

const getMovie = async (movieId) => {
  const url = `/movie/${movieId}`;
  const response = await clients.tmdb.get(url);
  const data = response.data;

  return data;
};

const getLikeOnMovie = async (movieId) => {
  const url = `/movies/${movieId}/like`;
  const response = await clients.api.get(url);
  const data = response.data;

  return data;
};

const likeMovie = async (movieId) => {
  const url = `/movies/${movieId}/like`;
  const response = await clients.api.put(url);
  const data = response.data;

  return data;
};

const unlikeMovie = async (movieId) => {
  const url = `/movies/${movieId}/like`;
  const response = await clients.api.delete(url);
  const data = response.data;

  return data;
};

const getMovieComments = async (movieId) => {
  const url = `/movies/${movieId}/comments`;
  const response = await clients.api.get(url);
  const data = response.data;

  return data;
};

const writeMovieComment = async (movieId, content) => {
  const url = `/movies/${movieId}/comments`;
  const response = await clients.api.post(url, { content });
  const data = response.data;

  return data;
};

const moviesAPI = {
  getMovieList,
  getMovie,
  getLikeOnMovie,
  likeMovie,
  unlikeMovie,
  getMovieComments,
  writeMovieComment,
};

export default moviesAPI;
