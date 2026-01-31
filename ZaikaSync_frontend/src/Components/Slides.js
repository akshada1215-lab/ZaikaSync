import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Slides.css";
import bgImage from "../images/hotel.jpeg";

function Slides() {
  return (
    <div className="slides-wrapper">
      <ToastContainer />

      <img
        src={bgImage}
        alt="Homepage Background"
        className="slides-bg"
      />

      <div className="slide-overlay">
        <h1>Welcome to <span>ZaikaSync</span></h1>
        <p>
         Fresh flavors, simple ordering, happy moments.
        </p>
      </div>
    </div>
  );
}

export default Slides;
