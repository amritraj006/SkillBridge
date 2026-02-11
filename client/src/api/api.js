import axios from "axios";

// Base URL depending on environment
const baseURL = import.meta.env.MODE === "production" 
    ? "https://skillbridge-9qwh.onrender.com" 
    : "http://localhost:5003";

const api = axios.create({
    baseURL,
});

export const getAllCourses = async () => {
    try {
        const response = await api.get("/api/courses");
        return response.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

export const getCourseById = async (id) => {
    try {
        const response = await api.get(`/api/courses/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching course by ID:", error);
        throw error;
    }
};

export default api;