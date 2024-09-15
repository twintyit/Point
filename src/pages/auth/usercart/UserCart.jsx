import React, { useState } from 'react';
import { useCart } from '../../../contexts/CartContext';
import { useModal } from '../../../contexts/ModalContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import QuantityControl from '../../../components/quantityControl/QuantityControl';
import './UserCart.css'; 

const UserCart = () => {
    const { closeModal } = useModal();
    const { cart, removeFromCart } = useCart();
    const [quantities, setQuantities] = useState(() =>
        cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity || 1 }), {})
    );
    const navigate = useNavigate();

    const handleQuantityChange = (id, quantity) => {
        setQuantities(prev => ({ ...prev, [id]: quantity }));
    };

    const handleRemove = (id) => {
        removeFromCart(id);
        setQuantities(prev => {
            const { [id]: removed, ...rest } = prev;
            return rest;
        });
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * (quantities[item.id] || 1)), 0);
    };

    return (
        <div className='user-cart'>
            <h3 className='cart-name'>Корзина</h3>

            {cart.length === 0 ? (
                <div className='cart-empty'>
                    <img src='https://xl-static.rozetka.com.ua/assets/img/design/modal-cart-dummy.svg'></img>
                    <h4>Корзина пуста</h4>
                    <p>Но это никогда не поздно исправить :)</p>
                </div>
            ) : (
                <div className='cart-items'>
                    <ul>
                        {cart.map((item) => (
                            <li key={item.id} className='cart-item'>
                                <div className='item-details'>
                                    <div className='cart-product_body'>
                                        <img src={item.images[0]} alt={item.name} className='item-image' />
                                        <div>
                                        <Link className='item-name' to={`/product/${item.id}`} onClick={closeModal}>{item.name}</Link>
                                        </div>
                                    </div>

                                    <div className='cart-product_footer ml-5'>
                                        <QuantityControl
                                            id={item.id}
                                            quantity={quantities[item.id] || 1}
                                        />
                                        <button className='btn btn-danger' onClick={() => handleRemove(item.id)}>
                                            Удалить
                                        </button>

                                        <p className='item-price'>{item.price * quantities[item.id]} ₴</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='cart-summary'>
                        <h2>Total: {calculateTotal()} ₴</h2>
                        <button className='checkout-button' onClick={handleCheckout}>
                            Оформить заказ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserCart;
