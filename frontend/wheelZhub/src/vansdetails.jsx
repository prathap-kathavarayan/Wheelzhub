import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./vansdetalis.css";

function VanDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const van = location.state; // get data passed from Vans.jsx

  if (!van) {
    return (
      <div className="vansdetails-container">
        <h2>No van details available.</h2>
        <button onClick={() => navigate("/vans")}>← Back to Vans</button>
      </div>
    );
  }

  return (
    <div className="vansdetails-container">
      <button className="back-btn" onClick={() => navigate("/vans")}>
        ← Back
      </button>
      <div className="vansdetails-card">
        <img src={van.img} alt={van.name} className="vansdetails-img" />
        <div className="vansdetails-info">
          <h2>{van.name}</h2>
          <p>{van.desc}</p>
            <button onClick={() => navigate("/signup", { state: van })}>
              Book Now
            </button>
        </div>
      </div>
    </div>
  );
}

export default VanDetails;
