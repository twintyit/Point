import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useModal } from '../../../contexts/ModalContext';
import './LoginPage.css'

const LoginPage = () => {
    const { closeModal} = useModal();
    const { loginUser } = useAuth();

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    
    const passwordRef = useRef(null);
    const loginRef = useRef(null);


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try{
            await loginUser(loginRef.current.value, passwordRef.current.value);
            navigate('/'); 
            closeModal();
        }catch(err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-page-container container">
            <h3 className="text-center mb-4">Войти</h3>
            <form onSubmit={handleLogin} className="form-container">
                <div className="floating-label-input-group mb-3">
                    <input
                        type="email"
                        ref={loginRef}
                        className={`form-control ${error && error.includes('Email') ? 'is-invalid' : ''}`}
                        id="emailInput"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="emailInput" className="form-label">Email</label>
                    {error && error.includes('Email') && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="floating-label-input-group mb-3">
                    <input
                        type="password"
                        ref={passwordRef}
                        className={`form-control ${error && error.includes('Password') ? 'is-invalid' : ''}`}
                        id="passwordInput"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="passwordInput" className="form-label">Password</label>
                    {error && error.includes('Password') && <div className="invalid-feedback">{error}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">Log In</button>
                {error && !error.includes('Email') && !error.includes('Password') && (
                    <p className="text-danger mt-3">{error}</p>
                )}
                <p className="mt-3 text-center">
                    Нет аккаунта? <Link to="/signup" onClick={closeModal}>Зарегистрироваться</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
