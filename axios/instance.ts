import axios from "axios";
import { storage } from "./helper.axios";

const API_BASE_URL="htpps://dev-api.mgdh.in/task";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  }
});



// 🔐 REQUEST INTERCEPTOR
api.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken(); 

    if (token) {
      config.headers["app-session-id"] = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// 🚨 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Unauthorized"
    ) {

      await storage.clear()
      // we will handle redirect manually in UI
    }

    return Promise.reject(error);
  }
);

export default api;