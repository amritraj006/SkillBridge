import api from "./api";
import axios from "axios";

export const getUserDetails = async (userId) => {
  try {
    const res = await api.get(`/api/user/${userId}`);  // ✅ correct
    return res.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await api.get(`/api/user`);
    return res.data
  } catch(error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}


const BASE_URL = "http://localhost:5003";

// get cart
export const getCart = async (userId) => {
  const res = await axios.get(`${BASE_URL}/api/user/cart/${userId}`);
  return res.data;
};

// toggle cart
export const toggleCartApi = async ({ userId, courseId }) => {
  const res = await axios.post(`${BASE_URL}/api/user/cart-toggle`, {
    userId,
    courseId,
  });
  return res.data;
};