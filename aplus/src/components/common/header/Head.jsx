import React from "react";
import "./Head.css";  // Import the CSS file

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1> A+ ETHIOPIA</h1>
            <span>BEST ONLINE EDUCATION & LEARNING IN ETHIOPIA</span>
          </div>

          <div className="social-links">
            <a
              href="https://www.facebook.com/fitsum.yenunuye/?locale=hi_IN&_rdr" // Replace with your Facebook URL
              target="_blank"
              rel="noopener noreferrer"
              className="btn facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.youtube.com/@AplusEthiopia" // Replace with your YouTube URL
              target="_blank"
              rel="noopener noreferrer"
              className="btn youtube"
            >
              YouTube
            </a>
            <a
              href="https://twitter.com/YourProfile" // Replace with your Twitter URL
              target="_blank"
              rel="noopener noreferrer"
              className="btn twitter"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/YourProfile" // Replace with your Instagram URL
              target="_blank"
              rel="noopener noreferrer"
              className="btn instagram"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;


