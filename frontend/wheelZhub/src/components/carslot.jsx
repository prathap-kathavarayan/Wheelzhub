import React from "react";
import "./homepage.css"; // reuse same style
import { useNavigate } from "react-router-dom";
import carimg from "./images/projectcar.avif"; // use your actual image path
import "./carslot.css"; // optional, same as bikeslot.css
import car1 from "./images/carimages/car 1.avif";
import car2 from "./images/carimages/car 2.avif";
import car3 from "./images/carimages/car 3.avif";
import car4 from "./images/carimages/car 4.avif"; 
import car5 from "./images/carimages/car 5.avif";
import car6 from "./images/carimages/car 6.avif";
import car7 from "./images/carimages/car 7.avif";
import car8 from "./images/carimages/car 8.avif";
import car9 from "./images/carimages/car 9.avif";
import car10 from "./images/carimages/car 10.avif";

function Cars() {
  const navigate = useNavigate();

  const carList = [
    { name: "Hyundai i20", img: car1, desc: "Compact and stylish hatchback." },
    { name: "Maruti Swift", img: car2, desc: "Reliable and efficient city car." },
    { name: "Tata Nexon", img: car3, desc: "Comfortable SUV with great mileage." },
    { name: "Honda City", img: car4, desc: "Premium sedan with smooth performance." },
    { name: "Ford EcoSport", img: car5, desc: "Sporty SUV with advanced features." },
    { name: "Mahindra Thar", img: car6, desc: "Rugged off-roader for adventure." },
    { name: "Kia Seltos", img: car7, desc: "Stylish SUV with modern tech." },
    { name: "Volkswagen Polo", img: car8, desc: "German engineering in a compact car." },
    { name: "Renault Duster", img: car9, desc: "Spacious SUV for family trips." },
    { name: "Skoda Octavia", img: car10, desc: "Luxury sedan with powerful engine." },
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
