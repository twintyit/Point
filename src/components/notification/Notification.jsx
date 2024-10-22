// Notification.js
import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, onClose, onOpenCart }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="notification">
            <p>{message}</p>
            <a onClick={onOpenCart} className="btn-open-cart">
                Открыть корзину
            </a>
        </div>
    );
};

export default Notification;
