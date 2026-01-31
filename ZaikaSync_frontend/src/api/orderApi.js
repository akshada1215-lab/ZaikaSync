import apiClient from "./apiClient";

export const createOrder = (orderPayload) => {
  return apiClient.post("/customer/createOrder", orderPayload);
};

export const getOrdersByUserId = (userId) => {
  return apiClient.get(`/customer/getOrdersByUserId/${userId}`);
};

export const getAllOrders = () => {
  return apiClient.get("/admin/getAllOrders");
};

// Admin – update order status
export const updateOrderStatus = (orderId, status) => {
  return apiClient.put(
    `/admin/${orderId}/status`,
    null, 
    {
      params: { status },
    }
  );
};


