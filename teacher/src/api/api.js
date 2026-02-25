import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${backendUrl}/api`,
});

export const getTeacherAllCourses = (teacherId) =>
  api.get(`/courses/teacher/${teacherId}/all`);

export const getTeacherPendingCourses = (teacherId) =>
  api.get(`/courses/teacher/${teacherId}/pending`);

export const getTeacherApprovedCourses = (teacherId) =>
  api.get(`/courses/teacher/${teacherId}/approved`);

export const getTeacherCourseById = (courseId, teacherId) =>
  axios.get(
    `${backendUrl}/api/courses/teacher/course/${courseId}?teacherId=${teacherId}`
  );


export const updateTeacherCourse = (courseId, teacherId, data) =>
  axios.put(
    `${backendUrl}/api/courses/teacher/update/${courseId}?teacherId=${teacherId}`,
    data
  );

  export const createCourse = (data) =>
  axios.post(`${backendUrl}/api/courses/create`, data);

export default api;