import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import "../global.css";

import { AuthProvider } from "@/context/authcontext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient();
export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="(auth)/login"
              options={{ headerShown: true, title: "Login" }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
          <Toast />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
