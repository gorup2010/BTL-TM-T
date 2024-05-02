import { http } from "../utils/http";

export const createPost = (body) => {
  try {
    console.log(1221312);
    const response = http.post("/posts", body);
    return response.data;
  } catch (e) {
    throw new Error("Create post failed");
  }
};
