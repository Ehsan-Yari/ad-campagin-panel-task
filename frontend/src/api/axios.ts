import axios from 'axios';

import { CONFIG } from 'src/global-config';

const axiosClient = axios.create({
  baseURL: CONFIG.serverUrl,
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error?.message || 'خطایی رخ داد';
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
