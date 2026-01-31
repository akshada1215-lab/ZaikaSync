import apiClient from "./apiClient";

export const processPayment = (paymentPayload) => {
  return apiClient.post("/customer/processPayment", paymentPayload);
};

export const getAllPayments = () => {
  return apiClient.get("/admin/getAllPayments");
};
