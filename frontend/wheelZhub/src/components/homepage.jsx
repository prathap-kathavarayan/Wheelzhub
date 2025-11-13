import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./homepage.css";

import projectbike from "./images/projectbike.jpg";
import projectcar from "./images/projectcar.avif";
import projectvan2 from "./images/projectvan2.avif";
import projectbus2 from "./images/projectbus2.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary fs-3" href="/">
            WheelZhub
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
              <li className="nav-item"><a className="nav-link" href="/signup">Signup</a></li>
              <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="fw-bold">Bike Rentals in Chennai</h1>
          <p className="lead">
            Affordable daily, weekly, and monthly rental options — Ride your freedom with WheelZhub.
          </p>
          <button className="btn btn-warning btn-lg mt-3" onClick={() => navigate("/bikes")}>
            Book Your Ride Now
          </button>
        </div>
      </section>

      {/* Vehicle Categories */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-5 text-dark">Our Vehicle Categories</h2>
        <div className="row g-4">
          {[
            { img: projectbike, title: "Bike Rentals", desc: "Daily, weekly & monthly bike rentals at affordable prices.", path: "/bikes" },
            { img: projectcar, title: "Car Rentals", desc: "Drive in comfort — hatchbacks, sedans, SUVs & more.", path: "/cars" },
            { img: projectvan2, title: "Van Rentals", desc: "Perfect for group trips and family getaways.", path: "/vans" },
            { img: projectbus2, title: "Bus Rentals", desc: "Travel together with our comfortable bus rentals.", path: "/buses" },
          ].map((v, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="vehicle-card shadow-sm" onClick={() => navigate(v.path)}>
                <img src={v.img} alt={v.title} className="vehicle-img" />
                <div className="vehicle-info text-center p-3">
                  <h5>{v.title}</h5>
                  <p>{v.desc}</p>
                  <button className="btn btn-outline-warning btn-sm">Choose Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Explore More Section */}
<section className="explore-more py-5 bg-light">
  <div className="container">
    <h2 className="fw-bold text-center mb-4">
      Explore More Car Rental Options in India
    </h2>

   
   

    {/* Car Models */}
    <div className="explore-category mb-5">
      <h5 className="fw-bold mb-3">Famous Car Models in Chennai</h5>
      <div className="link-grid">
        {[
          "Rent Mahindra Thar in Chennai",
          "Rent Mahindra XUV 700 in Chennai",
          "Rent Toyota Innova Crysta in Chennai",
        ].map((model, index) => (
          <a href="#" key={index}>{model}</a>
        ))}
      </div>
    </div>

    {/* Localities */}
    <div className="explore-category mb-5">
      <h5 className="fw-bold mb-3">Famous Localities in Chennai</h5>
      <div className="link-grid">
        {[
          "Rent a car in Adyar, Chennai", "Rent a car in Ambattur, Chennai", "Rent a car in Anna Nagar, Chennai",
          "Rent a car in Guindy, Chennai", "Rent a car in Madipakkam, Chennai", "Rent a car in Mylapore, Chennai",
          "Rent a car in OMR, Chennai", "Rent a car in Pallavaram, Chennai", "Rent a car in Porur, Chennai",
          "Rent a car in Sholinganallur, Chennai", "Rent a car in T Nagar, Chennai", "Rent a car in Tambaram, Chennai",
          "Rent a car in Vadapalani, Chennai", "Rent a car in Velachery, Chennai",
        ].map((loc, index) => (
          <a href="#" key={index}>{loc}</a>
        ))}
      </div>
    </div>

    {/* Routes */}
    <div className="explore-category">
      <h5 className="fw-bold mb-3">Famous Routes from Chennai</h5>
      <div className="link-grid">
        {[
          "Rent a car from Chennai To Bangalore",
          "Rent a car from Chennai To Goa",
          "Rent a car from Chennai To Kanchipuram",
          "Rent a car from Chennai To Madurai",
          "Rent a car from Chennai To Tirupati",
          "Rent a car from Chennai To Yelagiri Hills",
        ].map((route, index) => (
          <a href="#" key={index}>{route}</a>
        ))}
      </div>
    </div>
  </div>
</section>

<footer>
  <div className="footer-container">
    <div className="footer-section footer-brand">
      <h3 className="footer-logo">WheelZhub</h3>
      <p>
        It’s a never-ending battle of making your rides smoother and better,
        while striving to improve yourself.
      </p>
      <div className="footer-socials">
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </div>
    </div>

    <div className="footer-section">
      <h4>Account</h4>
      <ul>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Billing</a></li>
        <li><a href="#">Notifications</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>About</h4>
      <ul>
        <li><a href="#">Services</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Careers</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h4>Company</h4>
      <ul>
        <li><a href="#">Community</a></li>
        <li><a href="#">Help Center</a></li>
        <li><a href="#">Support</a></li>
      </ul>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2025 All Rights Reserved by WheelZhub</p>
    <div className="footer-legal">
      <a href="#">Terms</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Cookies</a>
    </div>
  </div>
</footer>
     
    </div>
  );
}

export default Home;
