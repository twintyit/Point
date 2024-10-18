// Notification.js
import React, { useEffect } from 'react';
import './Notification.css'; // Импортируем стили для алерта

const Notification = ({ message, onClose, onOpenCart }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Удаляем уведомление через 5 секунд

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
