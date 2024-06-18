// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Blog = () => {
//   const [blogPosts, setBlogPosts] = useState([]);
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     author: '',
    
//     image: '', // Assuming you have an input for image URL
//     youtubeLink: '', // Assuming you have an input for YouTube link
//   });

//   useEffect(() => {
//     fetchBlogPosts();
//   }, []);

//   const fetchBlogPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/blogposts');
//       setBlogPosts(response.data);
//     } catch (error) {
//       console.error('Error fetching blog posts:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3000/api/blogposts', formData);
//       console.log('New blog post created:', response.data);
//       // Clear the form after successful submission
//       setFormData({
//         title: '',
//         content: '',
//         author: '',
//         date: '',
//         image: '',
//         youtubeLink: '',
//       });
//       // Fetch blog posts again to update the list
//       fetchBlogPosts();
//     } catch (error) {
//       console.error('Error creating blog post:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Blog</h1>
//       {/* Form for creating new blog posts */}
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
//         <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" />
//         <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Author" />
//         <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" />
//         {/* Add inputs for image and YouTube link if needed */}
//         <button type="submit">Create Post</button>
//       </form>
//       {/* Display existing blog posts */}
//       <div>
//         {blogPosts.map((post) => (
//           <div key={post._id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//             {/* Display other fields as needed */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Blog;
