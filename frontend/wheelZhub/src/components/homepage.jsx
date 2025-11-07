import React from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import projectbike from "./images/projectbike.jpg";
import projectcar from "./images/projectcar.avif";
import projectvan2 from "./images/projectvan2.avif";
import projectbus1 from "./images/projectbus1.jpg";
import mainimg from "./images/mainimg.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* ===== Navbar ===== */}
      <header className="navbar">
        <h1 className="logo">WheelZhub</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/signup">Signup</a>
          <a href="/about">About</a>
        </nav>
      </header>

      {/* ===== Carousel ===== */}
      <section>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={mainimg}
                className="d-block w-100"
                alt="Main"
                style={{ height: "70vh" }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Premium Cars</h5>
                <p>Explore our collection of premium cars for your journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Vehicle Cards ===== */}
      <section className="rental-options">
        <h3>Choose Your Vehicle</h3>
        <div className="cards">
          <div className="card" onClick={() => navigate("/bikes")}>
            <img src={projectbike} alt="Bike Rental" />
            <h4>Bike Rental</h4>
            <p>Beat the traffic and enjoy city rides with our affordable bikes.</p>
            <button>View Bikes</button>
          </div>

          <div className="card" onClick={() => navigate("/Cars")}>
            <img src={projectcar} alt="Car Rental" />
            <h4>Car Rental</h4>
            <p>Explore the city or go on road trips with our premium self-drive cars.</p>
            <button>Book a Car</button>
          </div>

          <div className="card"  onClick={()=>navigate("/vans")}>
            <img src={projectvan2} alt="Van Rental" />
            <h4>Van Rental</h4>
            <p>Perfect for group trips with our comfortable and spacious vans.</p>
            <button>Book a Van</button>
          </div>

          <div className="card bus-card" onClick={() => navigate("/buses")}>
            <img src={projectbus1} alt="Bus Rental"  />
            <h4>Bus Rental</h4>
            <p>Ideal for large groups — travel together in comfort and style.</p>
            <button>Book a Bus</button>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <p>© 2025 WheelZhub | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;
