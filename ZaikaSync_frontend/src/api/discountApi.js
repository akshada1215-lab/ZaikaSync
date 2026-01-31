import apiClient from "./apiClient";

export const getDiscountSlabs = () => {
  return apiClient.get("/admin/active");
};

export const addDiscount = ({ startPrice, endPrice, discountPercentage }) => {
  return apiClient.post("/admin/addDiscount", null, {
    params: {
      startPrice,
      endPrice,
      discountPercentage,
    },
  });
};


// Admin – get all discounts
export const getAllDiscounts = () => {
  return apiClient.get("/admin/all");
};

// Admin – update discount active status
export const updateDiscountStatus = (discountId, isActive) => {
  return apiClient.put(
    `/admin/${discountId}/availability`,
    null, 
    {
      params: { isActive },
    }
  );
};



