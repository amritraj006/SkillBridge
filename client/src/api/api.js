import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_API;

const api = axios.create({ baseURL });

export default api;