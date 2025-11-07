import React from "react";
import "./homepage.css"; // reuse same style
import { useNavigate } from "react-router-dom";
import vanimg from "./images/projectvan2.avif"; // use your van image path
import "./carslot.css"; // optional, same style for consistency
import "./vanslot.css";

function Vans() {
  const navigate = useNavigate();

  const vanList = [
    { name: "Toyota Hiace", img: vanimg, desc: "Spacious van ideal for group travel." },
    { name: "Mahindra Bolero Camper", img: vanimg, desc: "Tough and durable utility van." },
    { name: "Force Traveller", img: vanimg, desc: "Perfect for large family or tour groups." },
    { name: "Tata Winger", img: vanimg, desc: "Comfortable and reliable travel van." },
  ];

  return (
    <div className="cars-container">
      <h1 className="car-title">Available Vans</h1>
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className="cards">
        {vanList.map((van) => (
          <div className="card" key={van.name}>
            <img src={van.img} alt={van.name} />
            <h4>{van.name}</h4>
            <p>{van.desc}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vans;
