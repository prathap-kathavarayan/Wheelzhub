import React, { useState } from "react";
import axios from "axios";
import "./LoginSignup.css";
import Link from "@mui/material/Link";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("http://127.0.0.1:8000/login", {
        params: {
          email: email,
          password_hash: password, // match FastAPI param name
        },
      });

      setMessage(response.data.message);
      console.log(response.data);
      alert("Login successful!");

      // optional redirect example:
      // window.location.href = "/dashboard";
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
        Don't have an account? <Link href="/signup">Signup here</Link>
      </h3>
    </div>
  );
}

export default Login;
