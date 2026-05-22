import axios from "axios";

const api = axios.create({
  baseURL: "https://b2bshield.dpdns.org/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      window.location.href = "/login";
    }

    if (error.response?.status >= 500) {
      console.log("Server Error");
    }

    return Promise.reject(error);
  }
);

export default api;