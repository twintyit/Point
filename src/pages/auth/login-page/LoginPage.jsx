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
        <div className="container">
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <div className="mb-3 form-floating">
                    <input
                        type="email"
                        ref={loginRef}
                        className={`form-control input-no-border ${error && error.includes('Email') ? 'is-invalid' : ''}`}
                        id="floatingInput" 
                        placeholder="name@example.com"
                    />
                    <label htmlFor="floatingInput" className="form-label">Email</label>
                    {error && error.includes('Email') && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="mb-3 form-floating">
                   
                    <input
                        type="password"
                        ref={passwordRef}
                        className={`form-control input-no-border ${error && error.includes('Password') ? 'is-invalid' : ''}`}
                        id="floatingPassword"
                        placeholder="Password"
                    />
                    <label htmlFor="floatingPassword" className="form-label">Password</label>
                    {error && error.includes('Password') && <div className="invalid-feedback">{error}</div>}
                </div>
                    <button type="submit" className="btn btn-primary">Log In</button>
                    {error && !error.includes('Email') && !error.includes('Password') && <p className="text-danger mt-3">{error}</p>}
                    <p className="mt-3">
                        Нет аккаунта? <Link to="/signup" onClick={closeModal}>Зарегистрироваться</Link>
                    </p>
            </form>
           
        </div>
    );
};

export default LoginPage;
