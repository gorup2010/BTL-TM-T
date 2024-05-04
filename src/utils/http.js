import axios from "axios";

const ENDPOINT = "http://localhost:3000/";

export const http = axios.create({
  baseURL: `${ENDPOINT}`,
  timeout: 20000,
});

http.interceptors.request.use(
  (config) => {
    // Add Token
    /*  let token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
    if (token && config.headers) {
      config.headers["Authorization"] = "Bearer " + token;
    } */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
