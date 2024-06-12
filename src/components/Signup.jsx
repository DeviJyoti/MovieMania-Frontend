import "../styles.css";
import React, { useState } from "react";
import { Link, Navigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [message, setMessage] = useState('');

  const checkPasswordStrength = (password) => {
    // Regular expressions to check for symbol, uppercase, lowercase, and number
    const symbolRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
  
    // Check if password meets all criteria
    const hasSymbol = symbolRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasNumber = numberRegex.test(password);
  
    return hasSymbol && hasUppercase && hasLowercase && hasNumber;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isStrongPassword = checkPasswordStrength(password);
    if(!isStrongPassword)
    {
      setMessage("Password must contain a symbol, uppercase letter, lowercase letter, and number")
    }
    else
    {
        // Form data to send in the request
      const userData = {
        UserName: username,
        Email: email,
        Password: password
      };

      try {
        // Make a POST request to the API endpoint using fetch
        const response = await fetch('https://moviemania.runasp.net/authentication/Register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        // Parse the JSON response
        const data = await response.json();

        if (response.ok) {
          // Handle successful registration (e.g., show a message, redirect, etc.)
          setMessage('User registered successfully!');
          setTimeout(()=>{
            setRedirectToLogin(true);
          },1300);
        } else {
          console.log(data.message+" this is the message");
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('There was an error registering the user. Please try again.');
      }
    }
  };

  if (redirectToHome) {
    return <Navigate to="/" />;
  }
  if (redirectToLogin) {
    return <Navigate to="/Login" />;
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="logo-header">
          <img src="/favicon.jpg" alt="Logo" />
        </div>
        <h2>Register</h2>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            required
          />
        </div>
        <div className="input-group buttons">
          <button type="button" className="button back-button" onClick={() => setRedirectToHome(true)}>Home</button>
          <button type="submit" className="button">Sign Up</button>
        </div>
        {message && <p className="message">{message}</p>}
        <p className="signup-link">
          Already have an account? <Link to="/Login">Sign in here</Link>
        </p>
      </form>
    </div>
  );
}
