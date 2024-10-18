import React from 'react';
import './Footer.css'; // Импортируем стили (если нужно)

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h5>Навигация</h5>
                        <ul>
                            <li><a href="/">Главная</a></li>
                            <li><a href="/about">О нас</a></li>
                            <li><a href="/products">Продукты</a></li>
                            <li><a href="/contact">Контакты</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h5>Контактная информация</h5>
                        <p>Телефон: +1 (555) 123-4567</p>
                        <p>Email: info@example.com</p>
                        <p>Адрес: 123 Примерная улица, Город, Страна</p>
                    </div>
                    <div className="col-md-4">
                        <h5>Подписка на новости</h5>
                        <form>
                            <input type="email" placeholder="Ваш email" required />
                            <button type="submit">Подписаться</button>
                        </form>
                    </div>
                </div>
                <div className="text-center">
                    <p>© {new Date().getFullYear()} Ваша Компания. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;