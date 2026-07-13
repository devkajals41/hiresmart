import api from "./api";

/**
 * Fetch the ATS report of the logged-in user.
 */
export const getAtsReport = async () => {
	const response = await api.get("/resume/report");
	return response.data;
};
