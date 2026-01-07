import React, { useEffect, useState } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import "./bikeslot.css";
import "./busslot.css";

// fallback image if backend image_url empty
import bikeFallback from "./images/bikeimages/bike1.avif";

const API_BASE = "http://localhost:8000";

function Bikes() {
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBikes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/vehicles?vehicle_type=bike`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API ${res.status}: ${text}`);
        }
        const data = await res.json();

        // Convert backend vehicle to UI bike object expected by BikeDetails
        const mapped = data.map((v) => ({
          id: v.id,
          name: v.name,
          desc: v.description || "",
          img: v.image_url && v.image_url.trim() !== "" ? v.image_url : bikeFallback,
          price: v.price,
          vehicle_type: v.vehicle_type,
        }));

        setBikes(mapped);
      } catch (err) {
        console.error("Error loading bikes:", err);
        setError(err.message || "Failed to load bikes");
      } finally {
        setLoading(false);
      }
    };

    loadBikes();
  }, []);

  const handleBook = (bike) => {
    navigate("/bike-details", { state: bike });
  };

  return (
    <div className="bikes-page">
      {/* BACK BUTTON */}
      <div className="header-bar" style={{ padding: "20px" }}>
        <button className="back-btn" onClick={() => navigate("/")}>
           Back
        </button>
      </div>

      <div className="hero-section">
        <div className="overlay" />
        <div className="hero-content">
          <h1>Choose Your Ride</h1>
          <p>All bikes are managed via admin panel and loaded dynamically.</p>
        </div>
      </div>

      <div className="rental-container">
        {loading && <p>Loading bikes...</p>}
        {error && (
          <p style={{ color: "red", gridColumn: "1/-1" }}>{error}</p>
        )}
        {!loading && !error && bikes.length === 0 && (
          <p style={{ gridColumn: "1/-1" }}>
            No bikes found. Add some from Admin Panel.
          </p>
        )}

        {!loading &&
          !error &&
          bikes.map((bike) => (
            <div className="parent-card" key={bike.id}>
              <div className="bike-card">
                <img src={bike.img} alt={bike.name} />
                <h4>{bike.name}</h4>
                {bike.price && <p>₹{bike.price} / day</p>}
                {bike.desc && <p>{bike.desc}</p>}
                <button onClick={() => handleBook(bike)}>Book Now</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Bikes;
