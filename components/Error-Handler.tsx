import React from 'react';
import { View, Text } from 'react-native';

interface ErrorProps {
  message?: string | null;
}

export const ErrorDisplay = ({ message }: ErrorProps) => {
  if (!message) return null;

  return (
    <View className="bg-red-100 border-l-4 border-red-500 p-3 my-2 rounded-r-md">
      <Text className="text-red-700 font-medium">{message}</Text>
    </View>
  );
};