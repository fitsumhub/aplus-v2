import React, { useState } from 'react';
import axios from 'axios';


const PostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    videoUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/posts', formData); // Replace '/api/posts' with your backend endpoint
      console.log('Post created:', response.data);
      // Handle success, reset form, show success message, etc.
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div className="container"> {/* Add container class */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Enter title" />
        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Enter content"></textarea>
        <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="Enter YouTube video URL" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
