import apiClient from "./apiClient";
import publicApiClient from "./publicApiClient";

export const addReview = (userId, comment) => {
  return apiClient.post(
    `/customer/addFeedback`,
    {},
    {
      params: { userId, comment },
    }
  );
};

export const getAllReviews = () => {
  return publicApiClient.get("/customer/getAllFeedback");
};