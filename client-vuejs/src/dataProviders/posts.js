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

async function editPost(postId, postData) {
  try {
    const res = await axiosInstance.put(`posts/${postId}`, postData);
    return res.data;
  }
  catch (error) {
    console.error(error);
    return null;
  }
}

async function votePositive(postId) {
  try {
    const res = await axiosInstance.post(`posts/votep/${postId}`, {});
    return res.data;
  }
  catch (error) {
    console.error(error);
    return null;
  }
}

async function voteNegative(postId) {
  try {
    const res = await axiosInstance.post(`posts/voten/${postId}`, {});
    return res.data;
  }
  catch (error) {
    console.error(error);
    return null;
  }
}

async function deletePost(postId) {
  try {
    const res = await axiosInstance.delete(`posts/${postId}`);
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
  editPost,
  votePositive,
  voteNegative,
  deletePost
};
