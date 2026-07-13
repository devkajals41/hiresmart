import api from "./api";

// Generate interview questions from the backend using role, topic, and difficulty.
// Token is attached automatically by the api.js interceptor — no need to pass it here.
export const generateInterview = async (config) => {
	const response = await api.post("/interview/generate", config);
	return response.data;
};

// Submit user answers for AI evaluation and get back structured feedback.
export const evaluateInterview = async (data) => {
	const response = await api.post("/interview/evaluate", data);
	return response.data;
};
