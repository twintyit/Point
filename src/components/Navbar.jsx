import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('email');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-brand">Shnurok</div>
                <div className="navbar-links">
                    {isLoggedIn ? (
                        <>
                            <span className="navbar-text">Hello, {email}</span>
                            <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
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