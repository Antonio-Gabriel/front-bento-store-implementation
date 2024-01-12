import Axios from 'axios';
import { useNotificationsStore } from '@/stores/notifications-store'


export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL
})

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationsStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  }
);
