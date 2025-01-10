import axios from "axios";

const baseURL = "https://api.themoviedb.org/3";
const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const tmdbClient = axios.create({
  baseURL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
  params: {
    language: "ko-KR",
    region: "KR",
  },
});

const getMovieList = async (category) => {
  const url = `/movie/${category}`;
  const response = await tmdbClient.get(url);
  const data = response.data;
  const movieList = data.results;

  return movieList;
};

const getMovie = async (movieId) => {
  const url = `/movie/${movieId}`;
  const response = await tmdbClient.get(url);
  const data = response.data;

  return data;
};

const logIn = async (dto) => {
  const url = "http://localhost:3000/api/auth/log-in";
  const response = await axios.post(url, dto);
  const data = response.data;

  return data;
};

const api = {
  logIn,
  getMovieList,
  getMovie,
};

export default api;
