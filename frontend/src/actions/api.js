import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const logedUser = JSON.parse(window.localStorage.getItem("loginUser"));

    if (logedUser && logedUser.token) {
      config.headers.Authorization = `Bearer ${logedUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
