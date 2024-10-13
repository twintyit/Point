import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import SearchBar from '../searchbar/SearchBar';
import IconButtons from '../navbarbuttons/IconButtons';

import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [icons, setIcons] = useState([]);

    const navigate = useNavigate();

    return (
        <nav className="navbar fixed-top">
            <div className="container">
                <div>
                    <Link to="/" className="navbar-brand text-light"><img src="https://cdn-icons-png.flaticon.com/512/4063/4063742.png" alt="Logo" className="navbar-icon" />Shnurok </Link>
                </div>
                <SearchBar />
                <div className="navbar-links">
                    <IconButtons></IconButtons>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;