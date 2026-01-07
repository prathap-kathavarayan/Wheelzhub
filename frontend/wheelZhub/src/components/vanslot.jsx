import React, { useEffect, useState } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import "./carslot.css";
import "./vanslot.css";
import vanFallback from "./images/vanimages/van1.png";

const API_BASE = "http://localhost:8000";

function Vans() {
  const navigate = useNavigate();
  const [vans, setVans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVans = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/vehicles?vehicle_type=van`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API ${res.status}: ${text}`);
        }

        const data = await res.json();

        const mapped = data.map((v) => ({
          id: v.id,
          name: v.name,
          desc: v.description || "",
          img:
            v.image_url && v.image_url.trim() !== ""
              ? v.image_url
              : vanFallback,
          price: v.price,
          vehicle_type: v.vehicle_type,
        }));

        setVans(mapped);
      } catch (err) {
        console.error("Error loading vans:", err);
        setError(err.message || "Failed to load vans");
      } finally {
        setLoading(false);
      }
    };

    loadVans();
  }, []);

  /* 🔙 BACK TO HOME */
  const handleBack = () => {
    navigate("/"); // Home page
  };

  /* 🔍 VIEW DETAILS */
  const handleView = (van) => {
    navigate("/van-details", { state: van });
  };

  return (
    <div className="vans-container">
      {/* BACK BUTTON */}
      <button className="back-btn" onClick={handleBack}>
        Back
      </button>

      <h2 className="car-title">Available Vans</h2>

      {loading && <p>Loading vans...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && vans.length === 0 && (
        <p>No vans found. Add some from Admin Panel.</p>
      )}

      <div className="cards">
        {!loading &&
          !error &&
          vans.map((van) => (
            <div className="card" key={van.id}>
              <img src={van.img} alt={van.name} />
              <h4>{van.name}</h4>
              {van.price && <p>₹{van.price} / day</p>}
              {van.desc && <p>{van.desc}</p>}

              <button
                className="details-btn"
                onClick={() => handleView(van)}
              >
                View Details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Vans;
