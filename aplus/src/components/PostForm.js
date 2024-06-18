// components/PostForm.js
import React, { useState } from 'react';

const PostForm = () => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post submission logic, e.g., sending data to the server
    console.log({ text, photo, youtubeLink });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text"
      ></textarea>
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <input
        type="text"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        placeholder="YouTube Link"
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
