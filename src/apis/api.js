import axios from "axios";

const API_URL = "http://localhost:4000/api/v1/auth"; // Update backend URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      JSON.stringify({ email, password }), // Convert data to JSON string
      {
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
        withCredentials: true, // Include cookies if needed
      }
    );

    if (response.data.success) {
      localStorage.setItem("token", response.data.token);
      return { success: true, user: response.data.user };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: error.response?.data?.message || "Login failed" };
  }
};
