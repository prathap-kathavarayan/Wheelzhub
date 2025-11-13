import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./bussdetalis.css";
import "./traval.jsx";


function BusDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const bus = location.state;

  if (!bus) {
    return (
      <div className="busdetails-container">
        <h2>No bus details available.</h2>
        <button onClick={() => navigate("/buses")} className="back-btn">
          ← Back to Buses
        </button>
      </div>
    );
  }

  return (
    <div className="busdetails-container">
      <div className="header-bar">
        <button className="back-btn" onClick={() => navigate("/buses")}>
          ← Back
        </button>
      </div>

      <div className="busdetails-card">
        <img src={bus.img} alt={bus.name} className="bus-img" />

        <div className="bus-info">
          <h2>{bus.name}</h2>
          <p>{bus.desc}</p>

          <div className="bus-extra">
            <h3>Facilities</h3>
            <ul>
              <li>AC and Wi-Fi Available</li>
              <li>Comfortable Reclining Seats</li>
              <li>Professional Drivers</li>
              <li>24/7 Service Support</li>
            </ul>
          </div>

          <div className="bus-booking">
            <p className="price-text">Fare starts at</p>
            <h3 className="price-amount">₹1200/day</h3>
           <button onClick={() => navigate("/car-booking", { state: bus })}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusDetails;
