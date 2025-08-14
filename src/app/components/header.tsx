'use client';

import React from 'react';
import '../styling/header.css';

export default function Header({ title,logo,somethign }) {
    return (
        <div className="header-container">
            <div className="top-bar">
                <div className="idk">
                    <div className="vibestring">
                    VibeString
                    <span className="small-circle"></span>
                </div></div>

                <div className="big-circle">
                    {logo && <img src={logo} alt="Brand logo" className="brand-logo-inCircle" />}
                </div>
            </div>

            <section className="hero-section">
                <div>
                    <h1 className="hero-title">{title}</h1>
                    {somethign && <h4 className="hero-subtitle">{somethign}</h4>}
                </div>
            </section>
        </div>
    );
}
