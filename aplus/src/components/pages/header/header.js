import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
     const token = localStorage.getItem("token");
     const navigate = useNavigate();
     const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); 
     };
 
     const isLoggedIn = token && token !== 'undefined';

     return (
       <>
         <Navbar bg={isLoggedIn ? 'primary' : 'dark'} variant="dark">
           <Container>
             <Navbar.Brand as={Link} to="">
               {isLoggedIn ? 'Logged-In' : 'Not-LoggedIn'}
             </Navbar.Brand>
             <Nav className="ml-auto">
               {isLoggedIn ? (
                 <>
                   <Nav.Link className="nav-link" onClick={handleLogout}>
                     Logout
                   </Nav.Link>
                 </>
               ) : (
                 <>
                   <Nav.Link as={Link} to="/login" className="nav-link">
                     Login
                   </Nav.Link>
                   <Nav.Link as={Link} to="/register" className="nav-link">
                     Signup
                   </Nav.Link>
                 </>
               )}
             </Nav>
           </Container>
         </Navbar>
       </>
     );
   };
   
   export default Header;   