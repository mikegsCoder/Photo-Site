import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://photo-site-server.onrender.com/api/',
  withCredentials: true,
});
