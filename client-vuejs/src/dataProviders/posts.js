import { axiosInstance } from './axios';

async function getAllPosts() {
  try {
    const res = await axiosInstance.get('posts');
    return res.data;
  }
  catch (error) {
    console.error(error);
    return {
      posts: [],
    };
  }
}

export { 
	getAllPosts, 
};
