import { isAxiosError } from 'axios';
import Toast from 'react-native-toast-message';

export const handleError = (error: unknown) => {
  if (isAxiosError(error)) {
    Toast.show({
      type: 'error',
      text1: error.response?.data.message || 'Something went wrong',
    })
    

    throw error;
  }

  Toast.show({
    type: 'error',
    text1: 'Something went wrong',
  });
  throw error;
};
