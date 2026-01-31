import apiClient from "./apiClient";
import publicApiClient from "./publicApiClient";

// Login API
export const loginUser = (loginData) => {
  return publicApiClient.post("/login", loginData);
};

export const registerUser = (userData) => {
  return publicApiClient.post("/customer/registerUser", userData);
};

export const forgotPassword = (email) => {
  return publicApiClient.post("/auth/forgot-password", null, {
    params: { email },
  });
};

export const resetPassword = (email, newPassword) => {
  return publicApiClient.post("/auth/reset-password", null, {
    params: {
      email,
      newPassword,
    },
  });
};

// Logout (frontend only)
export const logoutUser = () => {
  sessionStorage.clear();
};
