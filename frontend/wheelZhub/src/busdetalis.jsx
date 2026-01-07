import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./bussdetalis.css";

function BusDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const bus = location.state;

  // If page refreshed / no data
  if (!bus) {
    return (
      <div className="busdetails-container">
        <h2>No bus details available.</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="busdetails-container">
      {/* BACK BUTTON */}
      <div className="header-bar">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Homepage
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
              <li>AC & Wi-Fi Available</li>
              <li>Comfortable Seats</li>
              <li>Professional Driver</li>
              <li>24/7 Support</li>
            </ul>
          </div>

          <div className="bus-booking">
            <p className="price-text">Fare starts at</p>
            <h3 className="price-amount">₹10000 / day</h3>

            <button
              className="book-btn"
              onClick={() => navigate("/signup", { state: bus })}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusDetails;
