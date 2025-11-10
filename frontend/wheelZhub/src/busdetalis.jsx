import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./bussdetalis.css";

function BusDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const bus = location.state; // get data passed from Buses.jsx

  if (!bus) {
    return (
      <div className="busdetails-container">
        <h2>No bus details available.</h2>
        <button onClick={() => navigate("/buses")}>← Back to Buses</button>
      </div>
    );
  }

  return (
    <div className="busdetails-container">
      <button className="back-btn" onClick={() => navigate("/buses")}>
        ← Back
      </button>
      <div className="busdetails-card">
        <img src={bus.img} alt={bus.name} className="busdetails-img" />
        <div className="busdetails-info">
          <h2>{bus.name}</h2>
          <p>{bus.desc}</p>
          <button className="confirm-btn">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}

export default BusDetails;
