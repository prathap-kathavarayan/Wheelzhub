import React, { useState } from "react";
import axios from "axios";
import "./SignupLogin.css";
import Link from "@mui/material/Link";

function Signup() {
  // State to store form data and response message
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Handle input change dynamically
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // clear old message

    try {
      const res = await axios.post("http://127.0.0.1:8000/signup", {
        name: formData.username,
        email: formData.email,
        number: formData.phone,
        password_hash: formData.password,
      });

      if (res.data.message) {
        setMessage(res.data.message);
        setFormData({ username: "", email: "", phone: "", password: "" }); // clear form
      } else if (res.data.error) {
        setMessage(res.data.error);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup">
      <h2>SIGNUP HERE</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Signup</button>
      </form>

      {/* Feedback Message */}
      {message && <p className="message">{message}</p>}

      <h3 id="fp">
        Already have an account? <Link href="/login">Login here</Link>
      </h3>
    </div>
  );
}

export default Signup;
