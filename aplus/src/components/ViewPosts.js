// components/ViewPosts.js
import React, { useState, useEffect } from 'react';

const ViewPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from an API or a static list
    // Example posts
    setPosts([
      {
        id: 1,
        text: "First post",
        photo: "url_to_photo",
        youtubeLink: "https://www.youtube.com/embed/example1"
      },
      {
        id: 2,
        text: "Second post",
        photo: "url_to_photo",
        youtubeLink: "https://www.youtube.com/embed/example2"
      }
    ]);
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <p>{post.text}</p>
          {post.photo && <img src={post.photo} alt="Post" />}
          {post.youtubeLink && <iframe src={post.youtubeLink} title="YouTube video" />}
        </div>
      ))}
    </div>
  );
};

export default ViewPosts;
