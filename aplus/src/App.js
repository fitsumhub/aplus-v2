import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

//nati

import Login from "./components/pages/auth/login/Login";
import Signup from "./components/pages/auth/signup/Signup";

// Import components

import Header from './components/common/header/Header';
import Footer from './components/common/footer/Footer';
import About from './components/about/About';
import CourseHome from './components/allcourses/CourseHome';
import Team from './components/team/Team';
import Pricing from './components/pricing/Pricing';
import Home from './components/home/Home';
import PdfSection from './components/PDF/pdfsection';
import Video from './components/Freecourse/Video';

// Import Blog component
import Blog from './components/Blogg/Blog';

const App = () => {
  const [dataFromBackend, setDataFromBackend] = useState([]);

  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:3009/api/blogposts');
      setDataFromBackend(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromBackend();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Signup></Signup>}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<CourseHome />} />
        <Route path="/team" element={<Team />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/Freecourse" element={<Video />} />
        <Route path="/pdf" element={<PdfSection />} />
        <Route path="/video" element={<Video />} />
        
        {/* Add route for the Blog component */}
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
