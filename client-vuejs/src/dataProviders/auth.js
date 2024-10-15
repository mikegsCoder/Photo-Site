import { axiosInstance } from './axios';

async function loginUser(userData) {
  try {
    const res = await axiosInstance.post('users/login', userData);
    return res.data;
  }
  catch (error) {
    console.error(error);
    return error.response.data;
  }
}

async function registerUser(userData) {
  try {
    const res = await axiosInstance.post('users/register', userData);
    return res.data;
  }
  catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
}

export { 
  loginUser,
  registerUser,
};
