import axios from "axios";

const api = axios.create({
	// For local development: fallback to "http://localhost:8000/api" or load from the frontend/.env file.
	// To run locally, you can modify the VITE_API_URL variable inside the frontend/.env file.
	// For deployment, configure the VITE_API_URL environment variable on your hosting platform (Vercel/Netlify/etc.) to point to your live backend domain.
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// Automatically attach JWT token
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

// Handle unauthorized responses
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("user");
			window.location.href = "/login";
		}

		return Promise.reject(error);
	},
);

export default api;
