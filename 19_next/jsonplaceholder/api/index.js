import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/";
const client = axios.create({ baseURL });

const getPosts = async () => {
  const url = "/posts";
  const response = await client.get(url);
  const data = response.data;

  return data;
};

const getPost = async (postId) => {
  const url = `/posts/${postId}`;
  const response = await client.get(url);
  const data = response.data;

  return data;
};

const api = {
  getPosts,
  getPost,
};

export default api;
