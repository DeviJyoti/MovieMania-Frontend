// src/Header.js
import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import '../styles.css';
import './AddActor';
import { checkIsAdmin, checkIsLoggedIn, checkIsTokenExpired } from "../TokenHandlers";

const Header = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    useEffect(() => {
  
        if (checkIsTokenExpired()) 
        {
            setIsTokenExpired(true);
        }
        else
        {
            setUserDetails({
                name: localStorage.getItem('user'),
                role: localStorage.getItem('userRole'),
                token: localStorage.getItem('token')
            });
        }
      }, []); // Empty dependency array means this effect runs only once on mount
    
    const handleLogin = () => {
        setRedirectToLogin(true);
    };

    if(redirectToLogin)
    {
        return <Navigate to="/login"/>
    }
    const handleLogout = () => {
        localStorage.clear();
        setUserDetails(null);
    };

    return (
        <header className="header">
            <div className="header-left">
                <a href="/" className="header-title">Movie Mania</a>
            </div>
            <div className="header-center">
                <input type="text" className="header-search" placeholder="Search movies..." />
            </div>
            <div className="header-right">
                {userDetails && userDetails.role=="Admin" && (
                    <div className="header-dropdown">
                        <button className="header-dropbtn">Menu</button>
                        <div className="header-dropdown-content">
                        <a href="#movies">Add New Movie</a>
                        <a href="./AddActor">Add Actors</a>
                        <a href="./AddProducer">Add Producers</a>
                        <a href="./AddGenre">Add Genres</a>
                        <a href="#movies">View Movies</a>
                        <a href="#actors">View Actors</a>
                        <a href="#producer">View Producers</a>
                        <a href="#genres">View Genres</a>
                        </div>
                    </div>
                )}
                {userDetails ? (
                    <div className="header-user">
                        <span className="header-username">{userDetails.name}</span>
                        <button className="header-logout" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button className="header-login" onClick={handleLogin}>Login</button>
                )}
            </div>
        </header>
    );
}

export default Header;
