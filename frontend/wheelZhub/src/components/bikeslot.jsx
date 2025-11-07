import React from "react";
import "./homepage.css"; // reuse same style
import { useNavigate } from "react-router-dom";
import bikeimg from "./images/bikeimg.jpg";
import "./bikeslot.css";
import "./busslot.css";


function Bikes() {
  const navigate = useNavigate();

  const bikeList = [
    { name: "Yamaha R15", img: bikeimg, desc: "Sporty design, 155cc engine." },
    { name: "Royal Enfield Classic", img: bikeimg, desc: "Timeless looks, powerful ride." },
    { name: "Honda Activa", img: bikeimg, desc: "Smooth scooter for city rides." },
    { name: "KTM Duke 200", img: bikeimg, desc: "Aggressive street bike for thrill seekers." },
  ];

  return (
    <div className="bikes-container">
      <h2>Available Bikes</h2>
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className="cards">
        {bikeList.map((bike) => (
          <div className="card" key={bike.name}>
            <img src={bike.img} alt={bike.name} />
            <h4>{bike.name}</h4>
            <p>{bike.desc}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bikes;
