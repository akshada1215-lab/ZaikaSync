import apiClient from "./apiClient";
import publicApiClient from "./publicApiClient";

export const getAllCategories = () => {
  return publicApiClient.get("/admin/getAllCategories");
};

export const addCategory = (formData) => {
  return apiClient.post("/admin/addCategory", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};




