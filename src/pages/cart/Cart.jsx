import React from 'react';
import { useCart } from '../../contexts/CartContext.jsx';
import { useModal } from '../../contexts/ModalContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import QuantityControl from '../../components/quantity-control/QuantityControl.jsx';
import './Cart.css';

const UserCart = () => {
    const { closeModal } = useModal();
    const {state, deleteFromCart } = useCart();

    const navigate = useNavigate();

    const handleCheckout = () => {
        closeModal();
        navigate('/checkout');
    };

    return (
        <div className='user-cart'>
            <h3 className='cart-name'>Корзина</h3>
            {state.cart.length === 0 ? (
                <div className='cart-empty'>
                    <img src='https://xl-static.rozetka.com.ua/assets/img/design/modal-cart-dummy.svg'></img>
                    <h4>Корзина пуста</h4>
                    <p>Но это никогда не поздно исправить :)</p>
                </div>
            ) : (
                <div className='cart-items'>
                    <ul>
                        {state.cart.map((item) => (
                            <li key={item.product.id} className='cart-item'>
                                <div className='item-details'>
                                    <div className='cart-product_body'>
                                        <img src={item.product.images[0]} alt={item.product.name}
                                             className='item-image'/>
                                        <div>
                                            <Link className='item-name' to={`/product/${item.product.id}`}
                                                  onClick={closeModal}>{item.product.name}</Link>
                                        </div>
                                    </div>

                                    <div className='cart-product_footer ml-5'>
                                        <QuantityControl
                                            item={item}
                                        />
                                        <button className='btn btn-danger'
                                                onClick={() => deleteFromCart(item.product.id)}>
                                            Удалить
                                        </button>

                                        <p className='item-price'>{item.product.price * item.quantity} ₴</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='cart-summary-container'>
                        <div className="align-content-center">
                            <button className="btn btn-light"
                            onClick={closeModal}>Продолжить покупки</button>
                        </div>
                        <div className='cart-summary'>
                            <h1>{state.total} ₴</h1>
                            <button className='checkout-button' onClick={handleCheckout}>
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default UserCart;
