import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash.debounce';
import './Blog.css';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    youtubeLink: '',
    category: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === 'undefined') {
      navigate("/login");
    } else {
      fetchBlogPosts();
      fetchCurrentUser();
    }
  }, [navigate]);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3009/api/blogposts');
      setBlogPosts(response.data.reverse());
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setMessage('Error fetching blog posts.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:3009/api/user/current');
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'youtubeLink') {
      // Check if the entered value is a YouTube link
      const videoId = extractYouTubeId(value);
      if (videoId) {
        setFormData({ ...formData, youtubeLink: videoId });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const extractYouTubeId = (link) => {
    // Regex to match YouTube video ID from various URL formats
    const regExp =
      /^(?:(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))/;
    const match = link.match(regExp);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.author || !formData.category) {
      setMessage('Please fill in all required fields.');
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3009/api/blogposts/${editId}`, formData);
        setMessage('Blog post updated successfully!');
      } else {
        await axios.post('http://localhost:3009/api/blogposts', formData);
        setMessage('New blog post created successfully!');
      }
      setFormData({
        title: '',
        content: '',
        author: '',
        youtubeLink: '', // Clear youtubeLink after submission
        category: '',
      });
      setIsEditing(false);
      setEditId(null);
      fetchBlogPosts();
    } catch (error) {
      setMessage('Error saving blog post.');
      console.error('Error saving blog post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3009/api/blogposts/${postId}`);
      setMessage('Blog post deleted successfully.');
      fetchBlogPosts();
    } catch (error) {
      setMessage('Error deleting blog post.');
      console.error('Error deleting blog post:', error);
    }
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      content: post.content,
      author: post.author,
      youtubeLink: post.youtubeLink || '',
      category: post.category,
    });
    setIsEditing(true);
    setEditId(post._id);
  };

  const debouncedSearch = debounce(async (term) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3009/api/blogposts/search?term=${term}`);
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error searching blog posts:', error);
      setMessage('Error searching blog posts.');
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    fetchBlogPosts();
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const canEditOrDelete = (post) => {
    return currentUser && post.author && currentUser._id === post.author._id;
  };

  return (
    <div className="blog-container">
      <h1>Blog</h1>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="Content" required />
        <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder="Your Name" required />
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={formData.category} onChange={handleChange}>
          <option value="">Select a category</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Literature">Literature</option>
          {/* Add more relevant categories */}
        </select>
        <input type="text" name="youtubeLink" value={formData.youtubeLink} onChange={handleChange} placeholder="YouTube Link (optional)" />
        <button type="submit">{isEditing ? 'Update Post' : 'Create Post'}</button>
        {isEditing && (
          <button type="button" onClick={() => { setIsEditing(false); setEditId(null); setFormData({ ...formData, youtubeLink: '' }); }}>
            Cancel
          </button>
        )}
      </form>
      <div className="search-container">
        <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
        <button onClick={clearSearch}>Clear</button>
      </div>
      <div className="posts-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          currentPosts.map((post) => (
            <div key={post._id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <div className="meta">
                <span className="author">By {post.author}</span>
                {post.date && <span className="date">{new Date(post.date).toLocaleDateString()}</span>}
                <span className="category">Category: {post.category}</span>
              </div>
              {post.youtubeLink && (
                <div className="video-container">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${post.youtubeLink}`}
                    title="YouTube video"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {canEditOrDelete(post) && (
                <div className="post-actions">
                  <button onClick={() => handleEdit(post)}>Edit</button>
                  <button onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(blogPosts.length / postsPerPage) }).map((_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Blog;


