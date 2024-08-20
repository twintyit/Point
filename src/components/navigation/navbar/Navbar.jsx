import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../modal/Modal';
import SearchBar from '../searchbar/SearchBar';
import LoginPage from '../../../pages/auth/LoginPage';
import { getIcons } from '../../../api/apiFunctions';
import IconButtons from '../navbarbuttons/IconButtons';
import './Navbar.css';

const Navbar = () => {
    const [email, setEmail] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
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

    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const openModal = () => setIsModalVisible(true);
    const closeModal = () => setIsModalVisible(false);

    const handleCart = () => {
        alert("Comming soon...")
    };
    const handleViewOrders = () => {
        alert("Comming soon...")
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div>
                    
                    <Link to="/" className="navbar-brand text-light"><img src="https://cdn-icons-png.flaticon.com/512/4063/4063742.png" alt="Logo" className="navbar-icon" />Shnurok </Link>
                </div>
                <SearchBar />
                <div className="navbar-links">
                    <IconButtons isLoggedIn={isLoggedIn} onProfileClick={openModal} logout={handleLogout} onCartClick={handleCart} viewOrders={handleViewOrders}></IconButtons>
                </div>
            </div>
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <LoginPage closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} />
            </Modal>
        </nav>
    );
};

export default Navbar;