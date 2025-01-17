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

const localClient = axios.create({ baseURL: "http://localhost:3000" });

const getMovieList = async (category, page = 1) => {
  const url = `/movie/${category}`;
  const response = await tmdbClient.get(url, { params: { page } });
  const data = response.data;

  return data;
};

const getMovie = async (movieId) => {
  const url = `/movie/${movieId}`;
  const response = await tmdbClient.get(url);
  const data = response.data;

  return data;
};

const signUp = async (dto) => {
  const url = "/api/auth/sign-up";
  const response = await localClient.post(url, dto);
  const data = response.data;

  return data;
};

const logIn = async (dto) => {
  const url = "/api/auth/log-in";
  const response = await localClient.post(url, dto);
  const data = response.data;

  const token = data.token;

  // 이후 요청의 헤더에 토큰이 실려갈 수 있도록 조치
  localClient.defaults.headers.Authorization = `Bearer ${token}`;

  return data;
};

const api = {
  signUp,
  logIn,
  getMovieList,
  getMovie,
};

export default api;
