import React, { useEffect, useState } from "react";
import "./homepage.css"; // reuse same style
import "./busslot.css";
import { useNavigate } from "react-router-dom";
import busFallback from "./images/busimages/bus1.png";

const API_BASE = "http://localhost:8000";

function Buses() {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBuses = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/vehicles?vehicle_type=bus`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API ${res.status}: ${text}`);
        }
        const data = await res.json();

        const mapped = data.map((v) => ({
          id: v.id,
          name: v.name,
          desc: v.description || "",
          img: v.image_url && v.image_url.trim() !== "" ? v.image_url : busFallback,
          price: v.price,
          vehicle_type: v.vehicle_type,
        }));

        setBuses(mapped);
      } catch (err) {
        console.error("Error loading buses:", err);
        setError(err.message || "Failed to load buses");
      } finally {
        setLoading(false);
      }
    };

    loadBuses();
  }, []);

  const handleView = (bus) => {
    navigate("/bus-details", { state: bus });
  };

  return (
    <div className="buses-container">
      {/* BACK BUTTON */}
      <div className="header-bar">
        <button className="back-btn" onClick={() => navigate("/")}>
           Back
        </button>
      </div>

      <h2 className="car-title">Available Buses</h2>

      {loading && <p>Loading buses...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && buses.length === 0 && (
        <p>No buses found. Add some from Admin Panel.</p>
      )}

      <div className="cards">
        {!loading &&
          !error &&
          buses.map((bus) => (
            <div className="card" key={bus.id}>
              <img src={bus.img} alt={bus.name} />
              <h4>{bus.name}</h4>
              {bus.price && <p>₹{bus.price} / day</p>}
              {bus.desc && <p>{bus.desc}</p>}
              <button onClick={() => handleView(bus)}>View Details</button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Buses;
