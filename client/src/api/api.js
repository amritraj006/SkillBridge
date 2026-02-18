import axios from "axios";

// const isProd = import.meta.env.MODE === "production";

// const baseURL = isProd
//   ? "https://skillbridge-hnae.onrender.com"
//   : "http://localhost:5003";

// // ✅ verification logs
// console.log("🔍 Vite MODE:", import.meta.env.MODE);
// console.log("🌐 API Base URL:", baseURL);
// console.log(
//   isProd
//     ? "✅ Using PRODUCTION backend (Render)"
//     : "⚙️ Using LOCAL backend (localhost)"
// );

const baseURL = import.meta.env.VITE_BACKEND_API;

const api = axios.create({ baseURL });

export default api;