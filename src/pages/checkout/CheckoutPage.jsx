import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import './CheckoutPage.css'; // Добавьте свои стили здесь

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Реализуйте логику отправки данных на сервер

        console.log('Order placed:', { name, email, address, cart });
        clearCart(); // Очистка корзины после оформления заказа
    };

    return (
        <div className='checkout-form'>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='address'>Address</label>
                    <input
                        type='text'
                        id='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='submit-button'>
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CheckoutPage;
