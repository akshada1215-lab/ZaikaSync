import React from "react";
import { NavLink } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row">
          {/* About */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="footer-title">About Us</h4>
            <p className="footer-text">
              Welcome to <strong>ZaikaSync</strong>, a smart restaurant
              management and food ordering platform designed to simplify
              operations and enhance customer experience. We help restaurants
              manage orders, menus, and deliveries efficiently while serving
              fresh flavors with speed and care.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="list-unstyled footer-links">
              <li>
                <NavLink>Home</NavLink>
              </li>
              <li>
                <NavLink>About</NavLink>
              </li>
              <li>
                <NavLink>Services</NavLink>
              </li>
              <li>
                <NavLink>Contact</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="list-unstyled footer-text">
              <li>123 Main Street</li>
              <li>City, State, 12345</li>
              <li>Email: info@example.com</li>
              <li>Phone: +123-456-7890</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="footer-social text-center my-4">
          <a href="#!" className="social-btn facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#!" className="social-btn twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#!" className="social-btn google">
            <i className="fab fa-google"></i>
          </a>
          <a href="#!" className="social-btn instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#!" className="social-btn linkedin">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#!" className="social-btn github">
            <i className="fab fa-github"></i>
          </a>
        </div>

        {/* Copyright */}
        <div className="footer-bottom text-center">
          © 2025 <strong>ZaikaSync</strong>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
