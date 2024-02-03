import { getCookie } from 'src/action/auth-action';
import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    // You can set common headers here
  }
});

axiosInstance.interceptors.request.use(config => {
    const accessToken = getCookie('jwt')
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
