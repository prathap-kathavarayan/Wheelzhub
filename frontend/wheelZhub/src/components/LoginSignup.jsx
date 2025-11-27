import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://127.0.0.1:8000/login", {
        params: {
          email: email,
          password_hash: password,
        },
      });

      // Assuming response.data contains user info like { message: "Success", name: "Ajith" }
      if (response.data.message) {
        // POPUP with username (or email if name not available)
        const username = response.data.name || email;
        alert(` Login Successfully!`);

        // Redirect to home page
        navigate("/");
      }

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setMessage("Invalid email or password.");
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login">
      <h2 id="lp">LOGIN HERE</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {message && <p className="msg">{message}</p>}

      <h3 id="fp">
        Don't have an account? <Link to="/signup">Signup here</Link>
      </h3>
    </div>
  );
}

export default Login;
