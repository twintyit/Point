import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../api/apiFunctions.jsx';

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const handleSignup = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await signup({
                UserEmail: email,
                UserPassword: password,
                UserConfirmPassword: confirmPassword
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
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
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
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className={`form-control ${error && error.includes('Passwords do not match') ? 'is-invalid' : ''}`}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && error.includes('Passwords do not match') && <div className="invalid-feedback">{error}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                {error && !error.includes('Email') && !error.includes('Password') && !error.includes('Passwords do not match') && (
                    <p className="text-danger mt-3">{error}</p>
                )}
            </form>
        </div>
    );
};

export default SignupPage;
