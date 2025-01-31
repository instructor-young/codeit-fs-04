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

export const localClient = axios.create({ baseURL: "http://localhost:3000" });

export const apiClient = axios.create({ baseURL: "http://localhost:5555" });

apiClient.interceptors.request.use(async (config) => {
  if (config.url === "/users/refresh-token") return config;

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
  const url = "/users/sign-up";
  const response = await apiClient.post(url, dto);
  const data = response.data;

  return data;
};

const logIn = async (dto) => {
  const url = "/users/log-in";
  const response = await apiClient.post(url, dto);
  const data = response.data;

  const { accessToken, refreshToken } = data;

  // 이후 요청의 헤더에 토큰이 실려갈 수 있도록 조치
  apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);

  return data;
};

const refreshToken = async (prevRefreshToken) => {
  const url = "/users/refresh-token";
  const response = await apiClient.post(url, {
    refreshToken: prevRefreshToken,
  });
  const data = response.data;

  const { accessToken, refreshToken } = data;

  // 이후 요청의 헤더에 토큰이 실려갈 수 있도록 조치
  apiClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);

  return data;
};

const getLikeOnMovie = async (movieId) => {
  const url = `/movies/${movieId}/like`;
  const response = await apiClient.get(url);
  const data = response.data;

  return data;
};

const likeMovie = async (movieId) => {
  const url = `/movies/${movieId}/like`;
  const response = await apiClient.put(url);
  const data = response.data;

  return data;
};

const unlikeMovie = async (movieId) => {
  const url = `/movies/${movieId}/like`;
  const response = await apiClient.delete(url);
  const data = response.data;

  return data;
};

const getMovieComments = async (movieId) => {
  const url = `/movies/${movieId}/comments`;
  const response = await apiClient.get(url);
  const data = response.data;

  return data;
};

const writeMovieComment = async (movieId, content) => {
  const url = `/movies/${movieId}/comments`;
  const response = await apiClient.post(url, { content });
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
  getMovieComments,
  writeMovieComment,
};

export default api;
