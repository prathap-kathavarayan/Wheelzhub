import React from "react";
import "./homepage.css"; // reuse same style
import { useNavigate } from "react-router-dom";
import carimg from "./images/projectcar.avif"; // use your actual image path
import "./carslot.css"; // optional, same as bikeslot.css

function Cars() {
  const navigate = useNavigate();

  const carList = [
    { name: "Hyundai i20", img: carimg, desc: "Compact and stylish hatchback." },
    { name: "Maruti Swift", img: carimg, desc: "Reliable and efficient city car." },
    { name: "Tata Nexon", img: carimg, desc: "Comfortable SUV with great mileage." },
    { name: "Honda City", img: carimg, desc: "Premium sedan with smooth performance." },
    { name: "Ford EcoSport", img: carimg, desc: "Sporty SUV with advanced features." },
    { name: "Mahindra Thar", img: carimg, desc: "Rugged off-roader for adventure." },
    { name: "Kia Seltos", img: carimg, desc: "Stylish SUV with modern tech." },
    { name: "Volkswagen Polo", img: carimg, desc: "German engineering in a compact car." },
    { name: "Renault Duster", img: carimg, desc: "Spacious SUV for family trips." },
    { name: "Skoda Octavia", img: carimg, desc: "Luxury sedan with powerful engine." },
  ];

  return (
    <div className="cars-container">
      <h1 className="car-title">Available Cars</h1>
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div className="cards">
        {carList.map((car) => (
          <div className="card" key={car.name}>
            <img src={car.img} alt={car.name} />
            <h4>{car.name}</h4>
            <p>{car.desc}</p>
            <button>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
