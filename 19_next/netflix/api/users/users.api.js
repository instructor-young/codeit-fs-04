import clients from "../clients";

const signUp = async (dto) => {
  const url = "/users/sign-up";
  const response = await clients.api.post(url, dto);
  const data = response.data;

  return data;
};

const logIn = async (dto) => {
  const url = "/users/log-in";
  const response = await clients.api.post(url, dto);
  const data = response.data;

  const { accessToken, refreshToken } = data;

  // 이후 요청의 헤더에 토큰이 실려갈 수 있도록 조치
  clients.api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);

  return data;
};

const refreshToken = async (prevRefreshToken) => {
  const url = "/users/refresh-token";
  const response = await clients.api.post(url, {
    refreshToken: prevRefreshToken,
  });
  const data = response.data;

  const { accessToken, refreshToken } = data;

  // 이후 요청의 헤더에 토큰이 실려갈 수 있도록 조치
  clients.api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);

  return data;
};

const getMyProfile = async () => {
  const url = "/users/profile";
  const response = await clients.api.get(url);
  const data = response.data;

  return data;
};

const updateMyProfile = async (args) => {
  const { avatar, nickname } = args;

  const formData = new FormData();
  if (!!nickname) formData.append("nickname", nickname);
  if (!!avatar) formData.append("avatar", avatar);

  const url = "/users/profile";
  const response = await clients.api.put(url, formData);
  const data = response.data;

  return data;
};

const getMyReviews = async () => {
  const url = "/users/reviews";
  const response = await clients.api.get(url);
  const data = response.data;

  return data;
};

const usersAPI = {
  signUp,
  logIn,
  refreshToken,
  getMyProfile,
  updateMyProfile,
  getMyReviews,
};

export default usersAPI;
