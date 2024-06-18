import React from "react";
import Heading from "../../common/heading/Heading";
import "./Hero.css";

const Hero = () => {
  const redirectToYouTube = () => {
    // Create a new anchor element
    const anchor = document.createElement('a');
    // Set the href attribute to the YouTube channel URL
    anchor.href = "https://www.youtube.com/@AplusEthiopia";
    // Set the target attribute to '_blank' to open in a new tab
    anchor.target = "_blank";
    // Append the anchor to the body
    document.body.appendChild(anchor);
    // Programmatically click the anchor element to open the link
    anchor.click();
    // Remove the anchor from the body
    document.body.removeChild(anchor);
    // Display a message to the user
    alert("Redirecting to A+ Ethiopia YouTube channel.");
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="well">
              {/* <Heading
                // subtitle="WELCOME TO A+ Ethiopia"
                // title="Best Online Education website in Ethiopia"
              /> */}
              <p>"Achieve Your A+: Unleash Your Potential with A+ Ethiopia".</p>
              <div className="button">
                <button className="primary-btn" onClick={redirectToYouTube}>
                  SUBSCRIBE ON YOUTUBE NOW <i className="fa fa-long-arrow-alt-right"></i>
                </button>
                {/* You can add other buttons here */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Hero;



