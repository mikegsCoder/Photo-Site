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

async function createPost(postData) {
  try {
    const res = await axiosInstance.post(`posts/`, postData);
    return res.data;
  }
  catch (error) {
    console.error(error);
    return null;
  }
}

export { 
	getAllPosts,
  createPost,
};
