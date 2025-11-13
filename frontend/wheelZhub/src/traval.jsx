import React, { useState } from "react";
import "./traval.css";


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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Booking confirmed!\n\n" + JSON.stringify(form, null, 2));
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

            <label>From (Pickup Location)</label>
            <input
              type="text"
              name="from"
              placeholder="Enter pickup location"
              value={form.from}
              onChange={handleChange}
              required
            />

            <label>To (Drop Location)</label>
            <input
              type="text"
              name="to"
              placeholder="Enter destination"
              value={form.to}
              onChange={handleChange}
              required
            />

            <label>Pickup Date & Time</label>
            <input
              type="datetime-local"
              name="pickup"
              value={form.pickup}
              onChange={handleChange}
            />

            <label>Drop-off Date & Time</label>
            <input
              type="datetime-local"
              name="dropoff"
              value={form.dropoff}
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

