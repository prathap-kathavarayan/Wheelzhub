import React, { useState } from "react";
import axios from "axios";
import "./SignupLogin.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData({ ...formData, [name]: value.replace(/\D/g, "") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      setMessage("Enter a valid Gmail address");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/signup", {
        name: formData.username,
        email: formData.email,
        number: formData.phone,
        password_hash: formData.password,
      });

      if (res.data.message) {
        alert("Signup Successful 🚀");
        navigate("/login");
      } else {
        setMessage(res.data.error);
      }
    } catch {
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create Account</h2>
        <p className="subtitle">Rent Bikes & Cars Easily</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Full Name"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Gmail Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              maxLength="10"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        {message && <p className="error-msg">{message}</p>}

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
