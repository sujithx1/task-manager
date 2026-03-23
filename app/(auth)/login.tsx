import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { UseSendOtp, UseVerifyOtp } from "@/axios/auth.api";
import { handleError } from "@/axios/error";
import { storage } from "@/axios/helper.axios";

export default function login() {
  const postsendotpMutation = UseSendOtp();
  const postverifyotpMutation = UseVerifyOtp(); 
  const router = useRouter();
console.log(process.env.EXPO_PUBLIC_AUTH_URL);
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 📲 Handle actions
  const handleAction = async () => {
    setError(null);

    if (step === "phone") {
      if (phone.length !== 10) {
        setError("Enter valid 10-digit phone number");
        return;
      }

      setLoading(true);
      await postsendotpMutation.mutateAsync({
        phone: phone,
        client_id: "task"
      },{
        onSuccess: (data) => {
          setLoading(false);
          setStep("otp");
          setOtp(data?.data?.otp)
        },
        onError: (error) => {
          setLoading(false);
         return handleError(error);
          }
      })

    } else {
      if (otp.length !== 4) {
        setError("Enter valid OTP");
        return;
      }

      setLoading(true);

      await postverifyotpMutation.mutateAsync({
        phone: phone,
        client_id: "task",
        otp: otp
      },{
        onSuccess: async (data) => {
          setLoading(false);
          await storage.setToken(data?.data?.app_session_id);
          await storage.setUser(data?.data?.user);
          router.replace("/(tabs)");
        },
        onError: (error) => {
          setLoading(false);
         return handleError(error);
          }
      })
    }
  };

  return (
    <>
      {/* ✅ Header */}
      <Stack.Screen
        options={{
          title: step === "phone" ? "Login" : "Verify OTP",
          headerShown: false,
        }}
      />

      <View className="flex-1 bg-white px-6 justify-center">
        {/* Title */}
        <Text className="text-3xl font-bold text-black mb-8">
          {step === "phone" ? "Enter Phone Number" : "Enter OTP"}
        </Text>

        {/* ❌ Error */}
        {error && (
          <Text className="text-red-500 mb-4 font-semibold">
            {error}
          </Text>
        )}

        {/* Input */}
        <View className="border border-gray-300 rounded-xl px-4 py-3 mb-6 flex-row items-center">
          {step === "phone" && (
            <Text className="text-lg font-bold mr-2">+91</Text>
          )}

          <TextInput
            className="flex-1 text-lg"
            placeholder={step === "phone" ? "9876543210" : "1234"}
            keyboardType="number-pad"
            maxLength={step === "phone" ? 10 : 4}
            value={step === "phone" ? phone : otp}
            onChangeText={(text) => {
              setError(null);
              step === "phone" ? setPhone(text) : setOtp(text);
            }}
          />
        </View>

        {/* Button */}
        <TouchableOpacity
          onPress={handleAction}
          disabled={loading}
          className="bg-blue-500 py-4 rounded-xl items-center"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-bold">
              {step === "phone" ? "Send OTP" : "Verify OTP"}
            </Text>
          )}
        </TouchableOpacity>

        {/* Back to phone */}
        {step === "otp" && (
          <TouchableOpacity
            onPress={() => {
              setStep("phone");
              setOtp("");
              setError(null);
            }}
            className="mt-4"
          >
            <Text className="text-center text-gray-500">
              Change phone number
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}