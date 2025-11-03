import React from 'react';
import './LoginSignup.css';
import Link from '@mui/material/Link';

function Login() {
  return (
    <>
    <div className="login">
      <h2 id='lp'>LOGIN HERE</h2>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <h3 id='fp'>Don't have an account? <Link href="/signup">Signup here</Link></h3>
    </div>
  </>
  );
}
export default Login;