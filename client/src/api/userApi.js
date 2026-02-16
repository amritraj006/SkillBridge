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