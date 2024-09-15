// Import React and Link component for navigation
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                {/* Navigation links */}
                <li><Link to="/">StreamList</Link></li>
                <li><Link to="/movies">Movies</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/options">Options</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
