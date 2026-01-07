import React, { useState } from "react";
import "./travalformbike.css";


export default function CarBooking() {
  const [form, setForm] = useState({
    carType: "",
    from: "",
    to: "",
    pickup: "",
    dropoff: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };

    // when pickup location changes, suggest a default dropoff/to location
    if (name === "from") {
      const suggestions = {
        Chennai: "Chennai City Center",
        Madurai: "Madurai Meenakshi",
        Coimbatore: "Coimbatore Junction",
        Chennai:"velachery",
      };
      next.to = suggestions[value] || "";
    }

    setForm(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // build payload for backend
    const payload = {
      carType: form.carType,
      from_location: form.from,
      to: form.to,
      pickup: form.pickup,
      dropoff: form.dropoff,
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    fetch("http://127.0.0.1:8000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        alert("✅ Booking confirmed! Confirmation email sent.");
        // optionally reset form
        setForm({ carType: "", from: "", to: "", pickup: "", dropoff: "", name: "", email: "", phone: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("⚠️ Booking saved but failed to send confirmation email. Try again later.");
      });
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2 className="title">Choose your Vechicle</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="left">
            <label>Drive mood</label>
            <select name="carType" value={form.carType} onChange={handleChange}>
              <option value="">-- Choose your Comfort --</option>
              <option value="Sedan">Self Drive</option>
              <option value="SUV">On board Driver</option>
            </select>

            <label> Pickup location </label>
            <select name="from" value={form.from} onChange={handleChange} required>
              <option value="">-- Choose pickup location --</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Coimbatore">Coimbatore</option>
            </select>

            {form.from && (
              <p className="pickup-info">Selected pickup: {form.from} — suggested dropoff: {form.to}</p>
            )}

            <label>Pickup Date</label>
            <input
              type="date"
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
            />
            </div>

          <div className="right">
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-btn">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}