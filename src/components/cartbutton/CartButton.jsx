// components/CartButton.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons'; // Импортируем иконку корзины
import './CartButton.css'; // Импортируем стили
import { Button } from 'react-bootstrap';

const CartButton = () => {
    const handleClick = () => {
        alert('Coming soon...');
    };

    return (
        <button className="cart-button" onClick={handleClick}>
            <FontAwesomeIcon icon={faBasketShopping} className="cart-icon" />
        </button>
    );
};

export default CartButton;
