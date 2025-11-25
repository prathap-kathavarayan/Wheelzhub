import React, { useEffect, useState } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import "./carslot.css";

// fallback image
import carFallback from "./images/carimages/car 1.avif";

const API_BASE = "http://localhost:8000";

function Cars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/vehicles?vehicle_type=car`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`API ${res.status}: ${text}`);
        }
        const data = await res.json();

        const mapped = data.map((v) => ({
          id: v.id,
          name: v.name,
          desc: v.description || "",
          img: v.image_url && v.image_url.trim() !== "" ? v.image_url : carFallback,
          price: v.price,
          vehicle_type: v.vehicle_type,
        }));

        setCars(mapped);
      } catch (err) {
        console.error("Error loading cars:", err);
        setError(err.message || "Failed to load cars");
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const handleBook = (car) => {
    navigate("/car-details", { state: car });
  };

  return (
    <div className="cars-container">
      <h2 className="car-title">Available Cars</h2>

      {loading && <p>Loading cars...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && cars.length === 0 && (
        <p>No cars found. Add some from Admin Panel.</p>
      )}

      <div className="cards">
        {!loading &&
          !error &&
          cars.map((car) => (
            <div className="card" key={car.id}>
              <img src={car.img} alt={car.name} className="card-img" />
              <h4>{car.name}</h4>
              {car.price && <p>₹{car.price} / day</p>}
              {car.desc && <p>{car.desc}</p>}
              <button
                className="view-details-btn"
                onClick={() => handleBook(car)}
              >
                Book Now
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Cars;
