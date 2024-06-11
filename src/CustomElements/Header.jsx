// src/Header.js
import React, { useState } from 'react';
import '../styles.css';

const Header = () => {
    const [user, setUser] = useState(null);

    const handleLogin = () => {
        // Simulate a role check from a web API
        const userRole = prompt("Enter user role (admin/user):"); // For demonstration, replace with actual API call
        const isAdmin = userRole === 'admin';
        setUser({ name: 'John Doe', role: userRole, isAdmin });
    };

    const handleLogout = () => {
        setUser(null);
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
                {user && user.isAdmin && (
                    <div className="header-dropdown">
                        <button className="header-dropbtn">Menu</button>
                        <div className="header-dropdown-content">
                        <a href="#movies">Add New Movie</a>
                        <a href="#actors">Add Actors</a>
                        <a href="#producer">Add Producers</a>
                        <a href="#genres">Add Genres</a>
                        <a href="#movies">View Movies</a>
                        <a href="#actors">View Actors</a>
                        <a href="#producer">View Producers</a>
                        <a href="#genres">View Genres</a>
                        </div>
                    </div>
                )}
                {user ? (
                    <div className="header-user">
                        <span className="header-username">{user.name}</span>
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
