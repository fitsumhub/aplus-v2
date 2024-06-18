// EditPosts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleEditPost = (postId) => {
    // Logic to handle editing post
    console.log('Editing post with ID:', postId);
  };

  return (
    <div>
      <h2>Edit Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <button onClick={() => handleEditPost(post.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditPosts;
