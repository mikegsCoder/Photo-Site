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

async function getProfilePosts() {
  try {
    const res = await axiosInstance.get('/posts/user');
    // console.log(res.data);
    return res.data;
  }
  catch (error) {
    console.error(error);
    return {
      posts: [],
    };
  }
}

async function getPostById(id) {
  try {
    const res = await axiosInstance.get(`posts/${id}`);
    return res.data;
  }
  catch (error) {
    console.error(error);
    return null;
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
  getProfilePosts,
  getPostById,
  createPost,
};
