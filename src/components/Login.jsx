import "../styles.css";
import React, { useState } from "react";
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      UserName: username,
      Password: password
    };

    try {
      const response = await fetch('https://moviemania.runasp.net/authentication/login', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });
    
      if (response.ok) {
        const responseData = await response.json();

        // now store the response in local storage
        const { token, expiration, user, userRole } = responseData;

        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expiration);
        localStorage.setItem('user', user);
        localStorage.setItem('userRole', userRole[0]);
        setMessage("Login Successfull");

        setTimeout(()=>{
          setRedirectToHome(true);
        },1300);
      } else {
        const responseData = await response.json();
        setMessage('Request failed:', responseData.Message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }    
    
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="logo-header">
          <img src="/favicon.jpg" alt="Logo" />
        </div>
        <h2>Welcome Back</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>
        <div className="input-group buttons">
          <button type="button" className="button back-button" onClick={() => setRedirectToHome(true)}>Home</button>
          <button type="submit" className="button">Login</button>
        </div>
        {message && <p className="message">{message}</p>}
        <p className="signup-link">
          Don't have an account? <a href="/Signup">Sign up here</a>
        </p>
      </form>
    </div>
  );
}
