import React from 'react';
import './Footer.css'; // Импортируем стили (если нужно)

const Footer = () => {
    return (
        <footer className="bg-light py-1 pt-5">
            <div className="footer-container">
                <div className="row">

                    <div className="col-md-3">
                        <img src="/Logo-big.png" className="footer-logo pb-3" />
                        <p>Your one-stop marketplace for all your needs.</p>
                        <div className="d-flex gap-3">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                        </div>
                    </div>

                    {/* Про нас */}
                    <div className="col-md-2">
                        <h6 className="fw-bold">Про нас</h6>
                        <ul className="list-unstyled">
                            <li><a href="#">Про Point.</a></li>
                            <li><a href="#">Контакти</a></li>
                            <li><a href="#">Умови користування сайтом</a></li>
                            <li><a href="#">Вхід</a></li>
                            <li><a href="#">Реєстрація</a></li>
                        </ul>
                    </div>

                    {/* Покупцям */}
                    <div className="col-md-2">
                        <h6 className="fw-bold">Покупцям</h6>
                        <ul className="list-unstyled">
                            <li><a href="#">Point.-підтримка</a></li>
                            <li><a href="#">Оплата та доставка</a></li>
                            <li><a href="#">Питання-відповідь</a></li>
                            <li><a href="#">Гарантія та повернення</a></li>
                            <li><a href="#">Політика конфіденційності</a></li>
                        </ul>
                    </div>

                    {/* Продавцям */}
                    <div className="col-md-2">
                        <h6 className="fw-bold">Продавцям</h6>
                        <ul className="list-unstyled">
                            <li><a href="#">Довідник</a></li>
                            <li><a href="#">Як почати продавати на Point.</a></li>
                            <li><a href="#">Тарифи</a></li>
                            <li><a href="#">Угода користувача</a></li>
                            <li><a href="#">Правила роботи на маркетплейсі</a></li>
                        </ul>
                    </div>

                    {/* Новини */}
                    <div className="col-md-3">
                        <h6 className="fw-bold">Новини</h6>
                        <p>Підпишись, щоб отримувати найкращі пропозиції</p>
                        <div className="d-flex">
                            <input type="email" className="form-control me-2" placeholder="Ваш email" />
                            <button className="btn btn-dark">Підписатись</button>
                        </div>
                    </div>
                </div>

                {/* Нижняя часть футера */}
                <div className="text-center mt-4">
                    <hr/>
                    <p className="text-muted">© 2025 Point. Всі права захищені.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;