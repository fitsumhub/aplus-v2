import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from 'react-bootstrap';
import Head from "./Head";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = token && token !== 'undefined';

  return (
    <>
      <Head />
      <header>
        <Navbar bg={isLoggedIn ? 'primary' : 'dark'} variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {isLoggedIn ? 'Logged-In' : 'Not Logged-In'}
            </Navbar.Brand>
            <Nav className="ml-auto">
              {isLoggedIn ? (
                <Nav.Link className="nav" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="nav">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" className="nav2">
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>

        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB"} onClick={() => setClick(false)}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">All Courses</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/freecourse">Courses</Link></li>
            <li><Link to="/pdf">PDF Section</Link></li>
            <li><Link to="/video">Tutorial Video</Link></li>
            <li><Link to="/blogpost">Blog Post</Link></li>
          </ul>

          <div className="start">
            <div className="button">Subscribe on YouTube</div>
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"> </i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default Header;

