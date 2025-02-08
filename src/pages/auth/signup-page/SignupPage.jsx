import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../services/apiService.js';
import "./SignupPage.css"

const SignupPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

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
                UserConfirmPassword: confirmPassword,
                UserName: username
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
            <form onSubmit={handleSignup} className="p-4 border rounded shadow-sm">
                <h3 className="mb-4">Sign Up</h3>
                <div className="row ">
                    <div className="col-md-6 mb-5 position-relative floating-label-input-group">
                        <input
                            type="email"
                            className={`form-control border-0 border-bottom ${error && error.includes('Email') ? 'is-invalid' : ''}`}
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=""
                            required
                        />
                        <label htmlFor="email" className="form-label">Email</label>
                        {error && error.includes('Email') && <div className="invalid-feedback">{error}</div>}
                    </div>
                    <div className="col-md-6 mb-5 position-relative floating-label-input-group">
                        <input
                            type="text"
                            className="form-control border-0 border-bottom"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder=" "
                            required
                        />
                        <label htmlFor="username" className="form-label">Username</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-5 position-relative floating-label-input-group">
                        <input
                            type="password"
                            className={`form-control border-0 border-bottom ${error && error.includes('Password') ? 'is-invalid' : ''}`}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=" "
                            required
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                        {error && error.includes('Password') && <div className="invalid-feedback">{error}</div>}
                    </div>
                    <div className="col-md-6 mb-5 position-relative floating-label-input-group">
                        <input
                            type="password"
                            className={`form-control border-0 border-bottom ${error && error.includes('Passwords do not match') ? 'is-invalid' : ''}`}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder=" "
                            required
                        />
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        {error && error.includes('Passwords do not match') &&
                            <div className="invalid-feedback">{error}</div>}
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                {error && !error.includes('Email') && !error.includes('Password') && !error.includes('Passwords do not match') && (
                    <p className="text-danger mt-3">{error}</p>
                )}
            </form>
        </div>
    );
};

export default SignupPage;
