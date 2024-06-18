const express = require('express');
const mongoose = require('./src/config/dbConfig'); // Adjust the path based on your project structure
const signupRoute = require('./src/routes/signup');
const loginRoute = require('./src/routes/login');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3009;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/user", signupRoute);
app.use("/auth", loginRoute);

// Define BlogPost schema and model
const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  youtubeLink: String,
  category: String,
  date: { type: Date, default: Date.now }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

// Routes

// Get all blog posts
app.get('/api/blogposts', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ date: -1 }); // Sort by date descending
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new blog post
app.post('/api/blogposts', async (req, res) => {
  const { title, content, author, youtubeLink, category } = req.body;
  const newPost = new BlogPost({ title, content, author, youtubeLink, category });
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a blog post
app.delete('/api/blogposts/:id', async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search blog posts by title, content, or author
app.get('/api/blogposts/search', async (req, res) => {
  const { term } = req.query;
  try {
    const blogPosts = await BlogPost.find({
      $or: [
        { title: { $regex: term, $options: 'i' } },
        { content: { $regex: term, $options: 'i' } },
        { author: { $regex: term, $options: 'i' } },
      ],
    }).sort({ date: -1 }); // Sort by date descending
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
