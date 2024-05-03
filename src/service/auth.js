import { http } from "../utils/http";

export const getUserInfo = async (id) => {
  try {
    const response = await http.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
