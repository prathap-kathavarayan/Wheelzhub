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
  const [showPassword, setShowPassword] = useState(false); // Toggle password

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNums = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: onlyNums });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle signup submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Gmail validation
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      setMessage("Enter a valid Gmail address!");
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
        alert(`${formData.username} Signup Successfully!`);
        setFormData({ username: "", email: "", phone: "", password: "" });
        navigate("/login");
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
            placeholder="example@gmail.com"
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
            maxLength={10}
          />
        </div>

        <div style={{ position: "relative" }}>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "35px",
              cursor: "pointer",
              userSelect: "none",
              fontSize: "18px",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit">Signup</button>
      </form>

      {message && <p className="message">{message}</p>}

      <h3 id="fp">
        Already have an account? <Link to="/login">Login here</Link>
      </h3>
    </div>
  );
}

export default Signup;
