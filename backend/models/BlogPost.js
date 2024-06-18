// models/BlogPost.js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
 
  
  image: String,
  youtubeLink: String
});

module.exports = mongoose.model('BlogPost', blogPostSchema);


