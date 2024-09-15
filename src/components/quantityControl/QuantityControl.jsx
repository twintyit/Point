import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import './QuantityControl.css'
const QuantityControl = ({ id, quantity }) => {
    const { onQuantityChange } = useCart();
    const [newQuantity, setNewQuantity] = useState(quantity);

    useEffect(() => {
        setNewQuantity(quantity);
    }, [quantity]);

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setNewQuantity(value);
            onQuantityChange(id, value);
        }
    };

    const handleDecrease = () => {
        if (newQuantity > 1) {
            setNewQuantity(newQuantity - 1);
            onQuantityChange(id, newQuantity - 1);
        }
    };

    // Увеличение количества товара
    const handleIncrease = () => {
        setNewQuantity(newQuantity + 1);
        onQuantityChange(id, newQuantity + 1);
    };

    return (
        <div className='quantity-control'>
            <button onClick={handleDecrease} disabled={newQuantity <= 1} style={{ border: 'none', outline: 'none' }}>
                -
            </button>
            <input
                type="number"
                value={newQuantity}
                onChange={handleInputChange}
                className='quantity-input'
                min="1"
                style={{ width: '50px', textAlign: 'center' }}
            />
            <button onClick={handleIncrease} style={{ border: 'none', outline: 'none' }}>
                +
            </button>
        </div>
    );
};

export default QuantityControl;
