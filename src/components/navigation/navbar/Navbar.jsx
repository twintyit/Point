import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import LoginPage from '../../../pages/auth/LoginPage';
import { getIcons, logout } from '../../../api/apiFunctions';
import IconButtons from '../navbarbuttons/IconButtons';
import UserCart from '../../../pages/auth/usercart/UserCart';
import { useModal } from '../../../contexts/ModalContext';
import './Navbar.css';

const Navbar = () => {
    const { openModal, closeModal } = useModal();
    const [email, setEmail] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [icons, setIcons] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        if (storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
        } else {
            setIsLoggedIn(false);
        }
        const response = getIcons();
        setIcons(response);
    }, [isLoggedIn]);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        const res = await logout(token);
        
        if (res.status.code === 0){
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            navigate('/');
        }
    };

    const openModalLogin = () => {
        openModal(<LoginPage closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} ></LoginPage>);
    };

    const openModalCart = () => {
        openModal(<UserCart></UserCart>);
    };

    const handleCart = () => {
        openModalCart();
    };
    const handleViewOrders = () => {
        navigate('/cabinet');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div>
                    <Link to="/" className="navbar-brand text-light"><img src="https://cdn-icons-png.flaticon.com/512/4063/4063742.png" alt="Logo" className="navbar-icon" />Shnurok </Link>
                </div>
                <SearchBar />
                <div className="navbar-links">
                    <IconButtons isLoggedIn={isLoggedIn} onProfileClick={openModalLogin} logout={handleLogout} onCartClick={handleCart} viewOrders={handleViewOrders}></IconButtons>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;