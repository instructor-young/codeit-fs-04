import moviesAPI from "./movies/movies.api";
import usersAPI from "./users/users.api";

const api = {
  users: usersAPI,
  movies: moviesAPI,
};

export default api;
