import React, { useEffect, useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3009/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      navigate('/'); 
    } catch (error) {
      setError(error.message || 'Something went wrong');
      console.error(error.message);
    } finally {
      setFormData({
        email:'',
        password:''
      });
    }
  };

  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenTimestamp");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  return (
    <div className="center-form">
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete='true'
          />
        </Form.Group>

        <Button variant='dark' type='submit' className='w-100'>
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
