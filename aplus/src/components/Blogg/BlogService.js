import axios from 'axios';

// Define the base URL of the API
const baseURL = 'http://localhost:3000/api'; // Adjust the base URL according to your server setup

// Service object containing methods for interacting with the blog API
const BlogService = {
  // Method to fetch all posts from the server
  getAllPosts: () => axios.get(`${baseURL}/posts`),
  
  // Method to create a new post on the server
  createPost: (postData) => axios.post(`${baseURL}/posts`, postData),
  
  // Method to fetch a single post by its ID from the server
  getPostById: (postId) => axios.get(`${baseURL}/posts/${postId}`),
  
  // Method to update an existing post on the server
  updatePost: (postId, updatedData) => axios.put(`${baseURL}/posts/${postId}`, updatedData),
  
  // Method to delete a post by its ID from the server
  deletePost: (postId) => axios.delete(`${baseURL}/posts/${postId}`),
};

export default BlogService;

