import React, { useState } from "react";
import Heading from "../common/heading/Heading";
import "./about.css";
import { homeAbout } from "../../dummydata";
import Awrapper from "./Awrapper";

const AboutCard = () => {
  // State to manage the visibility of the pop-up
  const [showPopup, setShowPopup] = useState(false);

  // Event handler for clicking on the element
  const handleClick = () => {
    setShowPopup(true); // Set showPopup to true to display the pop-up message
  };

  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='left row'>
            <img src='./images/about.webp' alt='' />
          </div>
          <div className='right row'>
            <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' />
            <div className='items'>
              {homeAbout.map((val, index) => (
                <div className='item flexSB' key={index}>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                  </div>
                  <div className='text'>
                    <h2>{val.title}</h2>
                    <p>{val.desc}</p>
                  </div>
                </div>
              ))}
              {/* Element where click will trigger the pop-up */}
              <div className='item flexSB' onClick={handleClick}>
                <div className='img'>
                  <img src="../images/blog/b3.webp" alt='' /> {/* Replace with actual image */}
                </div>
                <div className='text'>
                  <h2>start courses!</h2> {/* Replace with actual title */}
                  <p>click hear to  start the course!</p> {/* Replace with actual description */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Conditional rendering of pop-up message */}
      {showPopup && (
        <div className='popup'>
          <p>Coming soon!</p> {/* Replace with your actual pop-up message */}
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}

      <Awrapper />
    </>
  );
};

export default AboutCard;

