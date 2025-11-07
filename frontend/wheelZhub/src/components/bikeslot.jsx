import React from "react";
import "./homepage.css"; // reuse same style
import { useNavigate } from "react-router-dom";
import bikeimg from "./images/bikeimg.jpg";
import "./bikeslot.css";
import "./busslot.css";
import bike1 from "./images/bikeimages/bike1.avif";
import bike2 from "./images/bikeimages/bike2.avif";
import bike3 from "./images/bikeimages/bike3.avif";
import bike4 from "./images/bikeimages/bike4.avif";
import bike5 from "./images/bikeimages/bike5.avif";
import bike6 from "./images/bikeimages/bike6.avif";
import bike7 from "./images/bikeimages/bike7.avif";
import bike8 from "./images/bikeimages/bike8.avif";
import bike9 from "./images/bikeimages/bike9.avif";
import bike10 from "./images/bikeimages/bike10.avif";



function Bikes() {
  const navigate = useNavigate();

  const bikeList = [
    { name: "Royal enfield bullet 350", img: bike1, desc: "jawa design, 155cc engine." },
    { name: "MT-15 Ver 2.0", img: bike2, desc: "Timeless looks, powerful ride." },
    { name: "Bajaj Pulsar 150", img: bike3, desc: "Smooth scooter for city rides." },
    { name: "KTM Duke 200", img: bike4, desc: "Aggressive street bike for thrill seekers." },
    { name: "Yamaha FZS FI V4", img: bike5, desc: "Performance and style combined." },
    { name: "KTM Bike 390 RC BLISTER PACK", img: bike6, desc: "Dynamic design, great handling." },
    { name: "Honda Dio", img: bike7, desc: "Sleek looks, efficient engine." },
    { name: "Honda Activa 5G", img: bike8, desc: "Reliable and fuel-efficient." },
    { name: "Ultraviolette F77 ", img: bike9, desc: "High-performance sportbike." },
    { name: "Ola Electric Scooter", img: bike10, desc: "Iconic design, thrilling ride." },
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
