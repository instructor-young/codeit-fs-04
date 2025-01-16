import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:5555" });

const api = {
  getBooks: async () => {
    const response = await client.get("/books");
    const data = response.data;

    return data;
  },
  addBook: async (newBook) => {
    const response = await client.post("/books", newBook);
    const data = response.data;

    return data;
  },
};

export default api;
