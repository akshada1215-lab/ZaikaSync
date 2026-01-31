import apiClient from "./apiClient";

export const getCartByUserId = (userId) => {
  return apiClient.get(`/customer/getCartByUserId/${userId}`);
};

export const removeFromCart = (userId, productId) => {
  return apiClient.delete("/customer/removeProductFromCart", {
    params: { userId, productId },
  });
};
