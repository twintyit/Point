import React, {createContext, useContext, useEffect, useReducer} from 'react';
import { login, logout } from '../api/apiFunctions';
import { useNavigate } from 'react-router-dom';
import {authReducer, initialState} from "../reducer/AuthReducer.jsx";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [authState, dispatch] = useReducer(authReducer, initialState);

    const loginUser = async (email, password) => {
        const response = await login({
            UserEmail: email,
            UserPassword: password,
        });

        if (response.status.code === 0) {
            const token = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', email);
            dispatch({
                type: 'LOGIN',
                payload: { userName: email, token },
            });
        }
    };

    const logoutUser = async (redirectTo) => {
        const res = await logout(authState.token);

        if (res.status.code === 0) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.setItem('cart', JSON.stringify([]));
            dispatch({ type: 'LOGOUT' });
            navigate(redirectTo);
        }
    };

    const getToken = () => {
        return authState.token;
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated: authState.isAuthenticated,
            userName: authState.userName,
            authState,
            dispatch,
            loginUser,
            logoutUser,
            getToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};