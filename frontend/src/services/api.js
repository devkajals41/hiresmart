import api from "./api";

// ─── Auth Interceptor ────────────────────────────────────────────────────────
// Automatically attach the JWT token from localStorage to every request.
// This means individual service calls don't need to manually pass the token.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response Interceptor ─────────────────────────────────────────────────────
// If the server returns 401 (token expired / invalid), clear local storage
// and redirect to login so the user can re-authenticate cleanly.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
