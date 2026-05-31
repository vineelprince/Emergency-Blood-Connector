import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://emergency-blood-connector.onrender.com",
});

export default axiosInstance;