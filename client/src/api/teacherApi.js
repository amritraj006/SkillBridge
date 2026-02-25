import api from "./api";

export const getAllTeachers = async () => {
    try {
        const res = await api.get("/api/teachers/");
        return res.data;
    } catch(error) {
        console.error("Error fetching teachers data:", error);
        throw error;
    }
}

