import api from "./api";

export const getTestimonials = async () => {
  const res = await api.get("/api/testimonials");
  return res.data;
};

export const addTestimonial = async (data) => {
  const res = await api.post("/api/testimonials/add", data);
  return res.data;
};