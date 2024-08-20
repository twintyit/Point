import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import './CartButton.css';

const CartButton = () => {
    const handleClick = () => {
        alert('Coming soon...');
    };

    return (
        <button className="icon-button" onClick={handleClick}>
            <FontAwesomeIcon icon={faBasketShopping} className="cart-icon" />
        </button>
    );
};

export default CartButton;
