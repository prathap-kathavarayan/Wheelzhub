import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./bikedetails.css";

function BikeDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const bike = location.state; // get data passed from Bikes.jsx

  if (!bike) {
    return (
      <div className="bikedetails-container">
        <h2>No bike details available.</h2>
        <button onClick={() => navigate("/bikes")}>← Back to Bikes</button>
      </div>
    );
  }

  return (
    <div className="bikedetails-container">
      <button className="back-btn" onClick={() => navigate("/bikes")}>
        ← Back
      </button>
      <div className="bikedetails-content">
        <div className="bike-image-container">
          <img src={bike.img} alt={bike.name} className="bike-main-image" />
        </div>
        <div className="bike-info">
          <h2>{bike.name}</h2>
          <p className="bike-description">{bike.desc}</p>
          
          <div className="bike-features">
            <h3>Features & Benefits</h3>
            <ul>
              <li>24/7 Roadside Assistance</li>
              <li>Comprehensive Insurance Included</li>
              <li>Flexible Rental Duration</li>
              <li>Well-maintained Vehicles</li>
              <li>Helmet Provided</li>
            </ul>
          </div>
          
          <div className="booking-section">
            <div className="price-info">
             
            </div>
            <button onClick={() => navigate("/signup", { state: bike })}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BikeDetails;
