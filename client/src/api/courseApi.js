import api from "./api";

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


