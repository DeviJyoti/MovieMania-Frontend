// src/Footer.js
import React from 'react';
import '../styles.css';
import { Link } from 'react-router-dom';
import { Navigate,Link } from 'react-router-dom';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p>&copy; 2024 Movie Mania. All rights reserved.</p>
                <div className="footer__social">
                    <Link to="#facebook">Facebook</Link>
                    <Link to="#twitter">Twitter</Link>
                    <Link to="#instagram">Instagram</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
