import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Signup.css'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:'',
    name:'',
    password:''
  })

   const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const response = await fetch("http://localhost:3009/user/register",  {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          })
        const result = await response.json();
        console.log(result);
        navigate('/login');
      }catch (error) {
            console.error(error.message);
      }finally{
         setFormData({
              email:'',
              name:'',
              password:''
         })
      }
    
   }
   
  return (
    <div className="center-form">
      <Form onSubmit={handleSubmit}>
           <h1>Signup</h1>
           <Form.Group controlId='formBasicEmail'>
            <Form.Label> Email Address </Form.Label>
              <Form.Control
                 type="email"
                 name="email"
                 placeholder="Enter your Email"
                 value={formData.email}
                 onChange={handleInputChange}
              />
           </Form.Group>

           <Form.Group controlId='formBasicName'>
            <Form.Label> Name</Form.Label>
              <Form.Control
                 type="text"
                 name="name"
                 placeholder="Enter your Name"
                 value={formData.name}
                 onChange={handleInputChange}
              />
           </Form.Group>

           <Form.Group controlId='formBasicPassword'>
            <Form.Label> Password </Form.Label>
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
            Signup
           </Button>
      </Form>
    </div>  
  );
}

export default Signup;
