const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectToMongoDB = require('./db'); // Require the MongoDB connection code

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectToMongoDB()
    .then(() => {
        // MongoDB connection successful, start Express.js server
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if MongoDB connection fails
    });

// Define User schema and routes (remaining code)
// Define User schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    isAdmin: Boolean
  });
  
  const User = mongoose.model('User', userSchema);
  
  // Express middleware for JSON parsing
  app.use(express.json());
  
  // Register route
  app.post('/api/register', async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashedPassword, isAdmin: false });
      await user.save();
      res.status(201).send('User registered successfully');
    } catch (error) {
      res.status(500).send('Error registering user');
    }
  });
  
  // Login route
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send('User not found');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).send('Invalid password');
      const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'secret');
      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send('Error logging in');
    }
  });
  
  // Middleware for verifying JWT token
  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token not provided');
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err) return res.status(401).send('Invalid token');
      req.user = decoded;
      next();
    });
  };
  
  // Admin route example
  app.get('/api/admin', verifyToken, (req, res) => {
    if (!req.user.isAdmin) return res.status(403).send('Access forbidden');
    res.status(200).send('Welcome to admin dashboard');
  });
  
