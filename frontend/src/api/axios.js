import axios from "axios";

const API_HOST =
  import.meta.env.VITE_API_BASE_URL ||
  "https://emergency-blood-connector-backend-0bdo.onrender.com";

// ensure no trailing slash and include /api prefix used by backend routes
const API_BASE_URL = API_HOST.replace(/\/$/, "") + "/api";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;