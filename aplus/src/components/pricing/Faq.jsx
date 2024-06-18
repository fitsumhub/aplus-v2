import React, { useState } from "react";
import { faq } from "../../dummydata";
import Heading from "../common/heading/Heading";

const Faq = () => {
  const [click, setClick] = useState(false);

  const toggle = (index) => {
    if (click === index) {
      setClick(null);
    } else {
      setClick(index);
    }
  };

  return (
    <>
      <Heading subtitle="FAQS" title="Frequently Asked Questions" />
      <section className="faq">
        <div className="container">
          {faq.map((val, index) => (
            <div className="box" key={index}>
              <button
                className="accordion"
                style={{ fontSize: "9px", padding: "1px 20px" }}
                onClick={() => toggle(index)}
              >
                <h2>{val.title}</h2>
                <span>
                  {click === index ? (
                    <i className="fa fa-chevron-down"></i>
                  ) : (
                    <i className="fa fa-chevron-right"></i>
                  )}
                </span>
              </button>
              {click === index ? (
                <div className="text">
                  <p>{val.desc}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Faq;
