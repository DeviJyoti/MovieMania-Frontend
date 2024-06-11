// src/Footer.js
import React from 'react';
import '../styles.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p>&copy; 2024 Movie Mania. All rights reserved.</p>
                <div className="footer__social">
                    <a href="#facebook">Facebook</a>
                    <a href="#twitter">Twitter</a>
                    <a href="#instagram">Instagram</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
