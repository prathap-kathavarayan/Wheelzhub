import React from "react";
import "./homepage.css"; // reuse same style
import { useNavigate } from "react-router-dom";
import busimg from "./images/projectbus1.jpg"; // use your actual bus image path
import "./busslot.css"; // optional, similar to carslot.css

function Buses() {
  const navigate = useNavigate();

  const busList = [
    { name: "Volvo AC Bus", img: busimg, desc: "Luxury AC bus ideal for long trips." },
    { name: "Tata Marcopolo", img: busimg, desc: "Comfortable seating and smooth travel." },
    { name: "Ashok Leyland", img: busimg, desc: "Spacious bus for group transportation." },
    { name: "Eicher Skyline", img: busimg, desc: "Reliable and efficient travel option." },
  ];

  return (
    <div className="buses-container">
      <h1 className="car-title">Available Buses</h1>
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className="cards">
        {busList.map((bus) => (
          <div className="card" key={bus.name}>
            <img src={bus.img} alt={bus.name} />
            <h4>{bus.name}</h4>
            <p>{bus.desc}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buses;
