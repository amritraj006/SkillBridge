import api from "./api"; // your existing axios instance

// Generate roadmap
export const generateRoadmap = async (data) => {
  try {
    const res = await api.post("/api/roadmap/generate", data);
    return res.data;
  } catch (error) {
    console.error("Error generating roadmap:", error);
    throw error;
  }
};

// Fetch roadmap history by userId
export const getRoadmapHistory = async (userId) => {
  try {
    const res = await api.get(`/api/roadmap/history/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching roadmap history:", error);
    throw error;
  }
};

// Delete single roadmap
export const deleteRoadmap = async (chatId) => {
  try {
    await api.delete(`/api/roadmap/delete/${chatId}`);
  } catch (error) {
    console.error("Error deleting roadmap:", error);
    throw error;
  }
};

// Delete all roadmaps of user
export const deleteAllRoadmaps = async (userId) => {
  try {
    await api.delete(`/api/roadmap/delete-all/${userId}`);
  } catch (error) {
    console.error("Error deleting all roadmaps:", error);
    throw error;
  }
};