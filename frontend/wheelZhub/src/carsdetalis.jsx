import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./carsdetails.css";

function CarDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const car = location.state; // get data passed from Cars.jsx

  if (!car) {
    return (
      <div className="cardetails-container">
        <h2>No car details available.</h2>
        <button onClick={() => navigate("/cars")}>← Back to Cars</button>
      </div>
    );
  }

  return (
    <div className="cardetails-container">
      <button className="back-btn" onClick={() => navigate("/cars")}>
        ← Back
      </button>
      <div className="cardetails-card">
        <img src={car.img} alt={car.name} className="cardetails-img" />
        <div className="cardetails-info">
          <h2>{car.name}</h2>
          <p>{car.desc}</p>
           <button onClick={() => navigate("/car-booking", { state: car })}>
              Book Now
            </button>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
