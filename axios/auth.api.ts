import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { storage } from "./helper.axios";




const Auth_URL="https://dev-api.mgdh.in/auth/api/v1"





const authApi = axios.create({
  baseURL: Auth_URL,
  headers: {
    "Content-Type": "application/json",
  }
});





export const UseSendOtp = () => {

  return useMutation({
    mutationFn: async (data: {
      phone:string,
      client_id:string
    }) => {
      const res = await authApi.post('/auth/send-otp', data);
      console.log('res',res);
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
      
      const res = await authApi.post('/auth/verify-otp', data,{
        headers:{
          'client-id':'task'
        }
      });
      console.log('verify',res.data); 

      if (res.data) {

          await storage.setToken(res.data.app_session_id);

      }
      return res.data;
    },

  });
};

export const UseValidateSession = () => {
  return useMutation({
    mutationFn: async () => {
      const token= await storage.getToken();
      authApi.defaults.headers.common['app-session-id'] = token;
      const res = await authApi.post('/validate-session');
      console.log('session',res);
      return res.data;
    },
  });
};