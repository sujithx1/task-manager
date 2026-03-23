import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});


// 🔐 REQUEST INTERCEPTOR
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("app_session_id");

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
      // clear storage
      await AsyncStorage.removeItem("app_session_id");
      await AsyncStorage.removeItem("user");

      // ❌ cannot use window.location
      // we will handle redirect manually in UI
    }

    return Promise.reject(error);
  }
);

export default api;