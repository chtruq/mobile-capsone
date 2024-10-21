import apiClient from "./apiClient";

// Hàm đăng nhập
export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });
    return response.data; // Trả về dữ liệu nhận được từ server
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

// Hàm đăng ký
export const register = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    const response = await apiClient.post("/auth/register", {
      name,
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Register API error:", error);
    throw error;
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await apiClient.post("/auth/verify-otp", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("Verify OTP API error:", error);
    throw error;
  }
};

export const resendOtp = async (email: string) => {
  try {
    const response = await apiClient.post(`/auth/resend-otp?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Resend OTP API error:", error);
    throw error;
  }
};
