import { http } from "../utils/http";

export const createPost = async (body) => {
  try {
    const response = await http.post("/posts", body);
    return response.data;
  } catch (e) {
    throw new Error("Create post failed");
  }
};

export const getPost = async () => {
  try {
    const response = await http.get("/posts");
    return response.data;
  } catch (e) {
    throw new Error("Create post failed");
  }
};
