import React from "react";
import "./homepage.css"; // reuse same style
import { useNavigate } from "react-router-dom";
import bikeimg from "./images/bikeimg.jpg";
import "./bikeslot.css";
import "./busslot.css";
import ktm from "./images/jawa.jpg";


function Bikes() {
  const navigate = useNavigate();

  const bikeList = [
    { name: "Yamaha R15", img: ktm, desc: "jawa design, 155cc engine." },
    { name: "Royal Enfield Classic", img: bikeimg, desc: "Timeless looks, powerful ride." },
    { name: "Honda Activa", img: bikeimg, desc: "Smooth scooter for city rides." },
    { name: "KTM Duke 200", img: bikeimg, desc: "Aggressive street bike for thrill seekers." },
    { name: "Bajaj Pulsar", img: bikeimg, desc: "Performance and style combined." },
    { name: "TVS Apache", img: bikeimg, desc: "Dynamic design, great handling." },
    { name: "Suzuki Gixxer", img: bikeimg, desc: "Sleek looks, efficient engine." },
    { name: "Hero Splendor", img: bikeimg, desc: "Reliable and fuel-efficient." },
    { name: "Kawasaki Ninja", img: bikeimg, desc: "High-performance sportbike." },
    { name: "Ducati Monster", img: bikeimg, desc: "Iconic design, thrilling ride." },
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
