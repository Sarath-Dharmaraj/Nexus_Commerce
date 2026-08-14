import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
  headers: { "content-type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/home" &&
      window.location.pathname !== "/product"
    )
      window.location.href = "/login";
    return Promise.reject(error);
  },
);

export default api;
