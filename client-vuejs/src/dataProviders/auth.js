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

export { 
  loginUser,
};
