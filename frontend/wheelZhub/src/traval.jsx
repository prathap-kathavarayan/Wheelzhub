// Uploaded file (for reference): /mnt/data/175d9f1e-e42a-4ea8-b6b1-f2719272c4d4.png
import React, { useState } from "react";
import "./traval.css";

export default function CarBooking() {
  const today = new Date().toISOString().split("T")[0];

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

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const suggestions = {
    Chennai: "Chennai Central",
    Madurai: "Madurai Meenakshi Amman Kovil",
    Coimbatore: "Coimbatore Junction",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...form, [name]: value };

    // when pickup location changes, suggest a default dropoff/to location
    if (name === "from") {
      next.to = suggestions[value] || "";
    }

    setForm(next);
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.email.trim()) return "Please enter your email.";
    if (!form.phone.trim()) return "Please enter your phone number.";
    if (!form.pickup) return "Please choose a pickup date.";
    if (form.dropoff && form.dropoff < form.pickup) return "Dropoff date cannot be before pickup date.";
    return null;
  };

  // Improved submit: better error handling and shows server validation details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const error = validate();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

    // Build payload that matches backend naming:
    // - include both from_location and "from" alias just in case
    // - include `to` (backend model uses `to`)
    const payload = {
      carType: form.carType,
      from_location: form.from,
      from: form.from, // alias (some backends may expect 'from')
      to: form.to,
      pickup: form.pickup,
      dropoff: form.dropoff,
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // read response safely
      let body = null;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        body = await res.json().catch(() => null);
      } else {
        const text = await res.text().catch(() => null);
        try { body = text ? JSON.parse(text) : null; } catch (_) { body = text; }
      }

      if (!res.ok) {
        // assemble useful server message
        let serverMsg = null;
        if (body) {
          if (typeof body === "object") {
            serverMsg = body.detail ? JSON.stringify(body.detail, null, 2) : JSON.stringify(body, null, 2);
          } else {
            serverMsg = String(body);
          }
        } else {
          serverMsg = `${res.status} ${res.statusText}`;
        }

        console.error("Booking API error:", { status: res.status, body });
        throw new Error(serverMsg);
      }

      const bookingId = body?.booking_id || body?.id || null;
      const emailStatus = body?.email_status || "pending";

      setMessage({
        type: "success",
        text: bookingId
          ? `✅ Booking confirmed! ID: ${bookingId}. Email status: ${emailStatus}.`
          : "✅ Booking confirmed! Confirmation email sent (or will be sent).",
      });

      setForm({ carType: "", from: "", to: "", pickup: "", dropoff: "", name: "", email: "", phone: "" });
    } catch (err) {
      console.error("submit error:", err);
      const pretty = err?.message ? err.message : String(err);
      setMessage({ type: "error", text: `⚠️ Request failed: ${pretty}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2 className="title">Choose your Vehicle</h2>

        <form onSubmit={handleSubmit} className="booking-form" aria-label="Car booking form">
          <div className="left">
            <label htmlFor="carType">Drive mode</label>
            <select id="carType" name="carType" value={form.carType} onChange={handleChange}>
              <option value="">-- Choose your Comfort --</option>
              <option value="Self">Self Drive</option>
              <option value="WithDriver">With Driver</option>
            </select>

            <label htmlFor="from">Pickup location</label>
            <select id="from" name="from" value={form.from} onChange={handleChange} required>
              <option value="">-- Choose pickup location --</option>
              <option value="Chennai">Chennai</option>
              <option value="Madurai">Madurai</option>
              <option value="Coimbatore">Coimbatore</option>
            </select>

            {form.from && (
              <p className="pickup-info">
                Selected pickup: <strong>{form.from}</strong> — suggested dropoff: <strong>{form.to || "(choose)"}</strong>
              </p>
            )}

            <label htmlFor="pickup">Pickup Date</label>
            <input
              id="pickup"
              type="date"
              name="pickup"
              value={form.pickup}
              min={today}
              onChange={handleChange}
              required
            />

            <label htmlFor="to">Dropoff location (optional)</label>
            <select id="to" name="to" value={form.to} onChange={handleChange}>
              <option value="">-- Choose dropoff location --</option>
              <option value="Chennai Central">Chennai Central</option>
              <option value="Madurai Meenakshi Amman Kovil">Madurai Meenakshi Amman Kovil</option>
              <option value="Coimbatore Junction">Coimbatore Junction</option>
            </select>

            <label htmlFor="dropoff">Dropoff Date (optional)</label>
            <input id="dropoff" type="date" name="dropoff" value={form.dropoff} min={form.pickup || today} onChange={handleChange} />
          </div>

          <div className="right">
            <label htmlFor="name">Your Name</label>
            <input id="name" type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} required />

            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />

            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" name="phone" placeholder="Enter phone number" value={form.phone} onChange={handleChange} required />

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Processing..." : "Confirm Booking"}
            </button>

            {message && (
              <div className={`message ${message.type}`} role={message.type === "error" ? "alert" : "status"}>
                {message.text}
              </div>
            )}
          </div>
        </form>

        <small className="hint">Tip: pick a pickup date today or later. Dropoff date is optional but can't be earlier than pickup.</small>
      </div>
    </div>
  );
}
