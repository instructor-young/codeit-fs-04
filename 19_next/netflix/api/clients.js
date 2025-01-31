import axios from "axios";
import { jwtDecode } from "jwt-decode";

const tmdbClientBaseURL = "https://api.themoviedb.org/3";
const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const tmdbClient = axios.create({
  baseURL: tmdbClientBaseURL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${tmdbApiKey}`,
  },
  params: {
    language: "ko-KR",
    region: "KR",
  },
});

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

const clients = {
  tmdb: tmdbClient,
  api: apiClient,
};

export default clients;
