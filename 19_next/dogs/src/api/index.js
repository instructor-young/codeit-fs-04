import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_DOG_API_KEY;
const client = axios.create({
  baseURL: "https://api.thedogapi.com/v1",
  headers: {
    "x-api-key": apiKey,
  },
});

const getBreeds = async () => {
  const url = "/breeds";
  const response = await client.get(url);
  const data = response.data;

  return data;
};

const getBreed = async (breedId) => {
  const url = `/breeds/${breedId}`;
  const response = await client.get(url);
  const data = response.data;

  return data;
};

const getImageById = async (imageId) => {
  const url = `/images/${imageId}`;
  const response = await client.get(url);
  const data = response.data;

  return data;
};

const api = {
  getBreeds,
  getBreed,
  getImageById,
};

export default api;
