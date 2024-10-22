import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../searchbar/SearchBar';
import IconButtons from '../navbar-buttons/IconButtons';

import './Navbar.css';

const Navbar = () => {
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