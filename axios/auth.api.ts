import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { storage } from "./helper.axios";




const Auth_URL=process.env.EXPO_PUBLIC_AUTH_URL||"http://localhost:5000"





const authApi = axios.create({
  baseURL: Auth_URL,
});





export const UseSendOtp = () => {

  return useMutation({
    mutationFn: async (data: {
      phone:string,
      client_id:string
    }) => {
      const res = await authApi.post('/send-otp', data);
      console.log(res);
      return res;
    },


  });
};



export const UseVerifyOtp = () => {

  return useMutation({

    mutationFn: async (data: {
      phone:string,
      client_id:string,
      otp:string
    }) => {
      const res = await authApi.post('/verify-otp', data);
      console.log(res);
      return res;
    },

  });
};

export const UseValidateSession = () => {
  return useMutation({
    mutationFn: async () => {
      const token= await storage.getToken();
      authApi.defaults.headers.common['app-session-id'] = token;
      const res = await authApi.post('/validate-session');
      console.log(res);
      return res;
    },
  });
};