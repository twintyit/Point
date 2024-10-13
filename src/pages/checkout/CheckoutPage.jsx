
import React, {useEffect, useState} from 'react';
import {useCart} from "../../contexts/CartContext.jsx";
import './CheckoutPage.css';
import {Link} from "react-router-dom";
import {confirmOrder} from "../../api/apiFunctions.jsx";
import {useAuth} from "../../contexts/AuthContext.jsx"; // Подключаем стили

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        country: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const { cart, cleanCart, total } = useCart();
    const {userName, getToken} = useAuth();
    const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(true);
    const [isAddressOpen, setAddressOpen] = useState(true);

    const submitConfirmOrder= (e) =>{
        e.preventDefault();
        console.log(formData);
        //cleanCart()
    }

    return (
        <div className="container my-4">
            <form onSubmit={submitConfirmOrder} >
                <div className="row">
                    <div className="col-lg-8">
                        {/* Блок с контактной информацией */}
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between card-cart-form"
                                 onClick={() => setPersonalInfoOpen(!isPersonalInfoOpen)}>
                                <h4>Контактные данные</h4>
                                <p className="align-content-center">
                                    {isPersonalInfoOpen ? 'Свернуть' : 'Развернуть'}
                                </p>
                            </div>
                            <div className={`collapse-content ${isPersonalInfoOpen ? 'open' : 'closed'}`}>
                                <div className="row card-body">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Имя</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Введите имя"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">Номер телефона</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                className="form-control"
                                                placeholder="Введите номер телефона"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-3">
                                            <label htmlFor="lastname" className="form-label">Фамилия</label>
                                            <input
                                                type="text"
                                                id="lastname"
                                                name="lastname"
                                                className="form-control"
                                                placeholder="Введите фамилию"
                                                value={formData.lastname}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Электронная почта</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Введите электронную почту"
                                                value={userName ? userName : formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Блок с адресом доставки */}
                            <div className="card mb-4">
                                <div className="card-header d-flex justify-content-between card-cart-form"
                                     onClick={() => setAddressOpen(!isAddressOpen)}>
                                    <h4>Адрес доставки</h4>
                                    <p className="align-content-center">
                                        {isAddressOpen ? 'Свернуть' : 'Развернуть'}
                                    </p>
                                </div>
                                <div className={`collapse-content ${isAddressOpen ? 'open' : 'closed'}`}>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">Улица, номер дома</label>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                className="form-control"
                                                placeholder="Введите адрес"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="city" className="form-label">Город, почтовый индекс</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                className="form-control"
                                                placeholder="Введите город и почтовый индекс"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="country" className="form-label">Страна</label>
                                            <input
                                                type="text"
                                                id="country"
                                                name="country"
                                                className="form-control"
                                                placeholder="Введите страну"
                                                value={formData.country}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Блок товаров в корзине */}
                            <div className="mb-4">
                                <h3>Заказ</h3>
                                {cart.map((item) => (
                                    <div className="cart-item d-flex justify-content-between align-items-center mb-3"
                                         key={item.product.id}>
                                        <div className="cart-item-info d-flex">
                                            <img src={item.product.images[0]} alt={item.product.name}
                                                 className="cart-item-image me-3"/>
                                            <span className='item-name'>{item.product.name}</span>
                                        </div>
                                        <div className="cart-item-price text-end">
                                            <div className="fw-bold">
                                                {item.product.price.toLocaleString()} ₴
                                            </div>
                                            <div className="text-muted">
                                                {item.quantity} ед.
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-end">
                                    <a href="#" className="text-decoration-none">Редактировать товары</a>
                                </div>
                            </div>
                        </div>

                        {/* Блок с итогами заказа */}
                        <div className="col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h4>Итог заказа</h4>
                            </div>
                            <div className="card-body">
                                <p>Общая сумма: {total}₴</p>
                                <button className="btn btn-success w-100" type="submit">
                                    Подтвердить заказ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
