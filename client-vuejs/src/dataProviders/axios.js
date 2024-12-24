import axios from 'axios';
const env_apiUrl = import.meta.env.VITE_API_BASE_URL;
const env_port = import.meta.env.PORT;

export const axiosInstance = axios.create({
  baseURL: env_apiUrl || 'http://localhost:3000/api/',
  port: env_port || 5173,
  withCredentials: true,
});
