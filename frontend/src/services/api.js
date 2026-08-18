import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach JWT token to every request
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

// Handle unauthorized requests
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - token may be missing or expired");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Don't force redirect for every request if you don't want it.
      // Redirect to login:
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;