import api from "./api";

// Fetch the ATS score report for the logged-in user's uploaded resume.
// Token is automatically attached by the api.js request interceptor.
export const getAtsReport = async () => {
  const response = await api.get("/resume/ats-report");
  return response.data;
};
