import React from "react";
import "./Section2.css";
import signupImg from "../images/hotel1.jpeg";

function Section2() {
  return (
    <div className="section2-wrapper">
      <img
        src={signupImg}
        alt="Restaurant"
        className="section2-image"
      />

      <div className="section2-overlay">
        <h2>Delicious Moments Await</h2>
        <p>Experience fresh flavors and effortless ordering.</p>
      </div>
    </div>
  );
}

export default Section2;
