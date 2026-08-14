import api from "../../services/api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

export const requestPasswordReset = async (payload) => {
  const response = await api.post("/auth/forgot-password", payload);
  return response.data;
};

export const resetPassword = async (payload) => {
  const response = await api.post("/auth/reset-password", payload);
  return response.data;
};
