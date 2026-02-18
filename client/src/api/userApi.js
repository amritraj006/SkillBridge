import api from "./api";

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


export const getCart = async (userId) => {
  const res = await api.get(`/api/user/cart/${userId}`);
  return res.data;
};


export const toggleCartApi = async ({ userId, courseId }) => {

  const res = await api.post(`/api/user/cart-toggle`, {
    userId,
    courseId,
  });

  return res.data;
};