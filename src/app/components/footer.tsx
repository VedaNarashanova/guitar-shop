import React from 'react';
import '../styling/footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <h3 className="footer-title">VibeStrings</h3>
                </div>
                <div className="footer-column">
                    <h4 className="footer-subtitle">Pages</h4>
                    <ul>
                        <li><a href="/guitar-shop/public">Home</a></li>
                        <li><a href="/brands">Brands</a></li>
                        <li><a href="/models">Models</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4 className="footer-subtitle">Product</h4>
                    <ul>
                        <li><a href="/product/details">Details</a></li>
                        <li><a href="/product/specs">Specs</a></li>
                        <li><a href="/product/musicians">Musicians</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4 className="footer-subtitle">Follow Us</h4>
                    <ul>
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
