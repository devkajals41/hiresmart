import api from "./api";

export const uploadResume = async (file, token) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/resume/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const viewResume = async (token) => {
  const response = await api.get("/resume/view", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });
  return response.data;
};
