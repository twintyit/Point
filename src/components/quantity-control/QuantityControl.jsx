import React from 'react';
import { useCart } from '../../contexts/CartContext';
import './QuantityControl.css'

const QuantityControl = ({ item }) => {
    const { addToCart, removeFromCart } = useCart();

    return (
        <div className='quantity-control'>
            <button onClick={() => { removeFromCart(item.product.id) } }  style={{ border: 'none', outline: 'none' }}>
                -
            </button>
            <input
                type="text"
                value={item.quantity}
                className='quantity-input'
                min="1"
                readOnly 
                style={{ width: '50px', textAlign: 'center' }}
            />
            <button onClick={() => { addToCart(item) }} style={{ border: 'none', outline: 'none' }}>
                +
            </button>
        </div>
    );
};

export default QuantityControl;
