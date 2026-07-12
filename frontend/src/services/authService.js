import api from "./api";

// Register User
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

// Get Logged-in User
export const getProfile = async () => {
  const response = await api.get("/profile/me");

  return response.data;
};
