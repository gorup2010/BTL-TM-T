import { http } from "../utils/http";

export const getUser = async () => {
  try {
    const response = await http.get(`/users`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (body) => {
  try {
    const response = await http.post("/users", body);
    return response.data;
  } catch (e) {
    throw new Error("Create user failed");
  }
};
