import axios from "axios";

const baseURL = import.meta.env.MODE === "production" 
    ? "https://skillbridge-9qwh.onrender.com" 
    : "http://localhost:5003";

const api = axios.create({
    baseURL,
});


export default api;