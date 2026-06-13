import axios from "axios";

const API_URL = "https://coreai-scan.onrender.com";

export const uploadDataset = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${API_URL}/analyze`,
    formData
  );

  return response.data;
};
