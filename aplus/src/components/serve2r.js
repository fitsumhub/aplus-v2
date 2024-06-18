// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:3000/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// BlogPost model
const BlogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: String,
  image: String,
  youtubeLink: String
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// CRUD Routes
app.get('/api/blogposts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/blogposts/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) return res.status(404).json({ message: 'Post not found' });
    res.json(blogPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/blogposts', async (req, res) => {
  const blogPost = new BlogPost(req.body);
  try {
    const newBlogPost = await blogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/blogposts/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blogPost) return res.status(404).json({ message: 'Post not found' });
    res.json(blogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/blogposts/:id', async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
