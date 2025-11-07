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
      <div className="bikedetails-card">
        <img src={bike.img} alt={bike.name} className="bikedetails-img" />
        <div className="bikedetails-info">
          <h2>{bike.name}</h2>
          <p>{bike.desc}</p>
          <button className="confirm-btn">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}

export default BikeDetails;
