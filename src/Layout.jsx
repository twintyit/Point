import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/navigation/navbar/Navbar';
import Sidebar from './components/navigation/slidebar/Sidebar';
import Footer from './components/navigation/footer/Footer';
import { useModal } from './contexts/ModalContext';
import Modal from './components/modal/Modal';
import './Layout.css';
import Notification from "./components/notification/Notification.jsx";
import {useCart} from "./contexts/CartContext.jsx";
import UserCart from "./pages/auth/usercart/UserCart.jsx";

const Layout = ({ children }) => {
    const location = useLocation();

    const {isModalVisible, modalContent, closeModal, openModal} = useModal();
    const {setShowNotification, showNotification} = useCart();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [sidebarContent, setSidebarContent] = useState('');

    useEffect(() => {
        if (location.pathname === '/') {
            setSidebarContent('categories');
            setIsSidebarVisible(true);
           
        } else if (location.pathname.startsWith('/cabinet')) {
            setSidebarContent('cabinet');
            setIsSidebarVisible(true);
        } else {
            setIsSidebarVisible(false);
        }
    }, [location.pathname]);

    return (
        <div className="app-layout">
            <Navbar />
            <div className="container-m">
                <Sidebar isVisible={isSidebarVisible} mode={sidebarContent} />
                <main className="content">
                    {children}
                </main>
                {isModalVisible && (
                    <Modal isVisible={isModalVisible} onClose={closeModal}>
                        {modalContent}
                    </Modal>
                )}
                {showNotification && (
                    <Notification
                        message="Товар добавлен в корзину"
                        onClose={()=>setShowNotification(false)}
                        onOpenCart={()=> openModal(<UserCart></UserCart>)}
                    />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
