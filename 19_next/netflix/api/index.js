import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

localClient.interceptors.request.use(async (config) => {
  if (config.url === "/api/auth/refresh-token") return config;

  const authorization = config.headers.Authorization || "";
  const accessToken = authorization.split("Bearer ")[1];
  if (!accessToken) return config;

  // 토큰의 만료 여부 체크
  const { exp } = jwtDecode(accessToken);
  if (exp * 1000 >= Date.now()) return config;

  // 토큰이 만료된 상황
  const prevRefreshToken = localStorage.getItem("refreshToken");
  const { accessToken: newAccessToken } = await api.refreshToken(
    prevRefreshToken
  );

  config.headers.Authorization = `Bearer ${newAccessToken}`;

  return config;
});

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

  const { accessToken, refreshToken } = data;

  // 이후 요청의 헤더에 토큰이 실려갈 수 있도록 조치
  localClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);

  return data;
};

const refreshToken = async (prevRefreshToken) => {
  const url = "/api/auth/refresh-token";
  const response = await localClient.post(url, {
    refreshToken: prevRefreshToken,
  });
  const data = response.data;

  const { accessToken, refreshToken } = data;

  // 이후 요청의 헤더에 토큰이 실려갈 수 있도록 조치
  localClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);

  return data;
};

const getLikeOnMovie = async (movieId) => {
  const url = `/api/movies/${movieId}/like`;
  const response = await localClient.get(url);
  const data = response.data;

  return data;
};

const likeMovie = async (movieId) => {
  const url = `/api/movies/${movieId}/like`;
  const response = await localClient.put(url);
  const data = response.data;

  return data;
};

const unlikeMovie = async (movieId) => {
  const url = `/api/movies/${movieId}/like`;
  const response = await localClient.delete(url);
  const data = response.data;

  return data;
};

const api = {
  signUp,
  logIn,
  getMovieList,
  getMovie,
  refreshToken,
  getLikeOnMovie,
  likeMovie,
  unlikeMovie,
};

export default api;
