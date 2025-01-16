import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:5555" });

const createPost = async (newPost) => {
  const response = await client.post("/posts", newPost);
  const data = response.data;

  return data;
};

const getPosts = async () => {
  const response = await client.get("/posts");
  const data = response.data;

  return data;
};

const getPost = async (postId) => {
  const response = await client.get(`/posts/${postId}`);
  const data = response.data;

  return data;
};

const updatePost = async (postId, post) => {
  const response = await client.put(`/posts/${postId}`, post);
  const data = response.data;

  return data;
};

const deletePost = async (postId) => {
  const response = await client.delete(`/posts/${postId}`);
  const data = response.data;

  return data;
};

const api = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};

export default api;
