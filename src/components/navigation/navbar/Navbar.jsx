import React from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../searchbar/SearchBar';
import IconButtons from '../navbar-buttons/IconButtons';

import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="fixed-top my-navbar">

            <div className="d-flex flex-column navbar-container">

                <div className="rectangle-top">
                </div>

                <div className=" navbar-bottom-container">
                    <div>
                        <Link to="/"><img className="navbar-icon" src="/Logo-big.png" alt="Logo"/></Link>
                    </div>
                    <SearchBar/>
                    <div className="navbar-links">
                        <IconButtons></IconButtons>
                    </div>
                </div>

            </div>

        </nav>
    );
};

export default Navbar;