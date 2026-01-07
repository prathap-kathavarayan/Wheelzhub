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
      const res = await axios.get("http://127.0.0.1:8000/login", {
        params: {
          email: email,
          password_hash: password,
        },
      });

      if (res.data.message) {
        alert("Login Successfully!");
        navigate("/car-booking");
      }
    } catch (err) {
      setMessage("Invalid email or password");
    }
  };

  return (
    <div className="login">
      <h2 id="lp">LOGIN HERE</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>

        {message && <p className="msg">{message}</p>}

        <p id="fp">
          Don't have an account? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
