// src/Header.js
import React, { useState, useEffect } from "react";
import { Navigate,Link } from 'react-router-dom';
import '../styles.css';
import '../components/AddActor';
import '../components/AddProducer';
import '../components/AddGenre';
import '../components/ViewActors';
import '../components/ViewProducers';
import { checkIsAdmin, checkIsLoggedIn, checkIsTokenExpired } from "../TokenHandlers";

const Header = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [isTokenExpired, setIsTokenExpired] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);
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
        return <Navigate to="/Login"/>
    }
    if(redirectToHome)
    {
        return <Navigate to="/"/>
    }
    const handleLogout = () => {
        localStorage.clear();
        setUserDetails(null);
        window.location.href = '/';
        // setRedirectToHome(true);
    };

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="header-title">MovieMania</Link>
            </div>
            <div className="header-center">
                <input type="text" className="header-search" placeholder="Search movies..." />
            </div>
            <div className="header-right">
                {userDetails && userDetails.role=="Admin" && (
                    <div className="header-dropdown">
                    <button className="header-dropbtn">Menu</button>
                    <div className="header-dropdown-content">
                        <Link to="/Movies/Add">Add New Movie</Link>
                        <Link to="/Actors/Add">Add Actors</Link>
                        <Link to="/Producers/Add">Add Producers</Link>
                        <Link to="/Genres/Add">Add Genres</Link>
                        <Link to="/">View Movies</Link>
                        <Link to="/Actors">View Actors</Link>
                        <Link to="/Producers">View Producers</Link>
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
