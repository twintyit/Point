import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
        } else {
            setIsLoggedIn(false);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/4063/4063742.png" alt="Logo" className="navbar-icon" />
                <Link to="/" className="navbar-brand text-light">Shnurok </Link>
                </div>
                <div className="navbar-links">
                    {isLoggedIn ? (
                        <>
                            <span className="navbar-text text-light">Hello, {email}</span>
                            <button className="btn btn-secondary " onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-primary">Login</Link>
                            <Link to="/signup" className="btn btn-secondary">Signup</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;