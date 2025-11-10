import React from "react";
import "./homepage.css"; // reuse same style
import { useNavigate } from "react-router-dom";
import busimg from "./images/projectbus1.jpg"; // use your actual bus image path
import "./busslot.css"; // optional, similar to carslot.css
import bus1 from "./images/busimages/bus1.png";
import bus2 from "./images/busimages/bus2.jpg";
import bus3 from "./images/busimages/bus3.jpg";
import bus4 from "./images/busimages/bus4.png"; 
import bus5 from "./images/busimages/bus5.jpg";
import bus6 from "./images/busimages/bus6.png";
import bus7 from "./images/busimages/bus7.png";
import bus8 from "./images/busimages/bus8.webp";
import bus9 from "./images/busimages/bus9.png";
import bus10 from "./images/busimages/bus10.png";

function Buses() {
  const navigate = useNavigate();

  const busList = [
    { name: "Volvo AC Bus", img: bus1, desc: "Luxury AC bus ideal for long trips." },
    { name: "Tata Marcopolo", img: bus2, desc: "Comfortable seating and smooth travel." },
    { name: "Ashok Leyland", img: bus3, desc: "Spacious bus for group transportation." },
    { name: "Eicher Skyline", img: bus4, desc: "Reliable and efficient travel option." },
    { name: "Mercedes-Benz Bus", img: bus5, desc: "Premium bus with top-notch amenities." },
    { name: "Scania Bus", img: bus6, desc: "High-performance bus for long distances." },
    { name: "Bharat Benz Bus", img: bus7, desc: "Durable and comfortable for all journeys." },
    { name: "Isuzu Bus", img: bus8, desc: "Efficient and reliable bus service." },
    { name: "Hino Bus", img: bus9, desc: "Comfort and safety for passengers alike." },
    { name: "MAN Bus", img: bus10, desc: "Robust bus designed for long hauls." },
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
          <button onClick={() => navigate("/bus-details", { state: bus })}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buses;
