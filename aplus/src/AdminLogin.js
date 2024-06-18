import React, { useState } from 'react';

import axios from 'axios';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:58597/api/admin/login', formData); // Replace with your backend API route
      // Handle successful login (e.g., store token in local storage)
      console.log(response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <button type="submit">Login</button>
        <button type="button" onClick={() => setFormData({ username: '', password: '' })}></button>
      </form>
    </div>
  );
};

export default AdminLogin;



