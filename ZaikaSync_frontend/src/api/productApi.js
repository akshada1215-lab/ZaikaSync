import apiClient from "./apiClient";
import publicApiClient from "./publicApiClient";

export const getProductsByCategory = (categoryId) => {
  return publicApiClient.get(`/admin/getProductsByCategory/${categoryId}`);
};

export const addToCart = (cartData) => {
  return apiClient.post("/customer/addToCart", cartData);
};

export const updateProductAvailability = (productId, isAvailable) => {   // add - price
  return apiClient.put(`/admin/updateAvailability/${productId}`, {
    isAvailable,
  });
};


export const getAllProducts = () =>
  apiClient.get("/admin/getAllProducts");

export const getProductById = (id) =>
  apiClient.get(`/admin/product/${id}`);

export const updateProduct = (id, data) =>
  apiClient.put(`/admin/updateProduct/${id}`, data);