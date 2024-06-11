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
            <div className="header__left">
                <a href="/" className="header__title">Movie Mania</a>
            </div>
            <div className="header__center">
                <input type="text" className="header__search" placeholder="Search movies..." />
            </div>
            <div className="header__right">
                {user && user.isAdmin && (
                    <div className="header__dropdown">
                        <button className="header__dropbtn">Edit</button>
                        <div className="header__dropdown-content">
                            <a href="#edit-details">Edit Movie Details</a>
                            <a href="#add-movie">Add New Movie</a>
                            <a href="#remove-movie">Remove Movie</a>
                        </div>
                    </div>
                )}
                {user ? (
                    <div className="header__user">
                        <span className="header__username">{user.name}</span>
                        <button className="header__logout" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button className="header__login" onClick={handleLogin}>Login</button>
                )}
            </div>
        </header>
    );
}

export default Header;
