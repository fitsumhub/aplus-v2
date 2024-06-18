// PostContent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const PostContent = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/posts', { title, content });
      console.log('Post created successfully:', response.data);
      // Clear form fields after successful submission
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h2>Post Content</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostContent;
