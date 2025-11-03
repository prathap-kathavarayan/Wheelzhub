import React from 'react';
import './SignupLogin.css';
import Link from '@mui/material/Link';

function Signup() {
  return (
    <div className="signup">
      <h2>SIGNUP HERE</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="phone">Number:</label>
          <input type="tel" id="phone" name="phone" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Signup</button>
      </form>
      <h3 id='fp'>Already have an account? <Link href="/login">Login here</Link></h3>
    </div>
    );
}

export default Signup;