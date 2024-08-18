import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../../modal/Modal';
import SearchBar from '../searchbar/SearchBar';
import LoginPage from '../../../pages/auth/LoginPage';
import { getIcons } from '../../../api/apiFunctions';
import ProfileButton from '../profilebutton/ProfileButton';
import CartButton from '../../cartbutton/CartButton';
import './Navbar.css';

const Navbar = () => {
    const [email, setEmail] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [icons, setIcons] = useState([]);

    const navigate = useNavigate();

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="container">
                <div>
                    <img src="https://cdn-icons-png.flaticon.com/512/4063/4063742.png" alt="Logo" className="navbar-icon" />
                <Link to="/" className="navbar-brand text-light">Shnurok </Link>
                </div>
                <SearchBar />
                <div className="navbar-links">
                    
                    {isLoggedIn ? (
                        <>
                            <span className="navbar-text text-light">Hello, {email}</span>
                            <button className="btn btn-secondary " onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                                <ProfileButton iconUrl={icons.account} openModal= {openModal}></ProfileButton>
                        </>
                    )}
                    <CartButton></CartButton>
                </div>
            </div>
            <Modal isVisible={isModalVisible} onClose={closeModal}>
                <LoginPage closeModal={closeModal} setIsLoggedIn={setIsLoggedIn} />
            </Modal>
        </nav>
    );
};

export default Navbar;