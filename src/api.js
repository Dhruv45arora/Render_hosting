import axios from "axios";

const api = axios.create({
  baseURL: "https://adminnanda.in/Job", // Backend API
  withCredentials: true,               // ✅ important: send cookies
});

export default api;
