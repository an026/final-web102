import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo">
                    <Link to="/">
                        <p>HousingHub</p>
                    </Link>
                </div>

                <div className="search">
                    <input type="text" placeholder="Search..." />
                </div>

                <div className="navigation">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/post" className="nav-link">Post</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
