// components/Header.tsx
'use client';

import React from 'react';
import '../styling/header.css';

export default function Header({ title }) {
    return (
        <div className="header-container">
            <div className="top-bar">
                <div className="vibestring">
                    VibeString
                    <span className="small-circle"></span>
                </div>
                <div className="big-circle"></div>
            </div>

            <section className="hero-section">
                <h1 className="hero-title">{title}</h1>
            </section>
        </div>
    );
}
