import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiFunctions';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await login({
                    UserEmail: email,
                    UserPassword: password,
                });
            localStorage.setItem('token', response.data);
            localStorage.setItem('email', email);
            navigate('/'); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className={`form-control ${error && error.includes('Email') ? 'is-invalid' : ''}`}
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && error.includes('Email') && <div className="invalid-feedback">{error}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className={`form-control ${error && error.includes('Password') ? 'is-invalid' : ''}`}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && error.includes('Password') && <div className="invalid-feedback">{error}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
                {error && !error.includes('Email') && !error.includes('Password') && <p className="text-danger mt-3">{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
