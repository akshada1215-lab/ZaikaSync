import apiClient from "./apiClient";

export const getUserById = (id) => {
  return apiClient.get(`/customer/getUserById/${id}`);
};

export const updateUser = (id, payload) => {
  return apiClient.put(`/customer/updateUser/${id}`, payload);
};
