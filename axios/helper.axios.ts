import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  getToken: () => AsyncStorage.getItem("app_session_id"),
  setToken: (t: string) => AsyncStorage.setItem("app_session_id", t),
  setUser: (t: string) => AsyncStorage.setItem("user", t),
  clear: () => AsyncStorage.multiRemove(["app_session_id", "user"]),
};