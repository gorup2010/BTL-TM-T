import { http } from "../utils/http";

export const getUserInfo = async (id) => {
  try {
    const response = await http.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInfo = async (id, body) => {
  try {
    const response = await http.patch(`/users/${id}`, body);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
