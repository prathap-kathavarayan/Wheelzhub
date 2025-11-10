import React from "react";
import "./homepage.css"; // reuse same style
import { useNavigate } from "react-router-dom";
import "./carslot.css"; // optional, same style for consistency
import "./vanslot.css";
import van1 from "./images/vanimages/van1.png";
import van2 from "./images/vanimages/van2.png";
import van3 from "./images/vanimages/van3.webp";
import van4 from "./images/vanimages/van4.png";
import van5 from "./images/vanimages/van5.png";
import van6 from "./images/vanimages/van6.png";  
import van7 from "./images/vanimages/van7.webp";
import van8 from "./images/vanimages/van8.jpg";
import van9 from "./images/vanimages/van9.png";
import van10 from "./images/vanimages/van10.jpg";


function Vans() {
  const navigate = useNavigate();

  const vanList = [
    { name: "Toyota Hiace", img: van1, desc: "Spacious van ideal for group travel." },
    { name: "Mahindra Bolero Camper", img: van2, desc: "Tough and durable utility van." },
    { name: "Force Traveller", img: van3, desc: "Perfect for large family or tour groups." },
    { name: "Tata Winger", img: van4, desc: "Comfortable and reliable travel van." },
    { name: "Maruti Suzuki Eeco", img: van5, desc: "Compact van for city and highway." },
    { name: "Renault Trafic", img: van6, desc: "Modern design with ample space." },
    { name: "Nissan NV350", img: van7, desc: "Versatile van for business and leisure." },
    { name: "Ford Transit", img: van8, desc: "Popular choice for group transportation." },
    { name: "Volkswagen Transporter", img: van9, desc: "Stylish and efficient van option." },
    { name: "Hyundai H1", img: van10, desc: "Premium van with advanced features." },
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
            <button
              className="details-btn"
              onClick={() => navigate("/van-details", { state: van })}>View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vans;
