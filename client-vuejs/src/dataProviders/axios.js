import axios from 'axios';
const env_apiUrl = import.meta.env.API_URL;

export const axiosInstance = axios.create({
  baseURL: env_apiUrl || 'http://localhost:3000/api/',
  withCredentials: true,
});
