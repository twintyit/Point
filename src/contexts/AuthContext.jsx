import React, {createContext, useContext, useEffect, useReducer} from 'react';
import { login, logout } from '../services/apiService.js';
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
        try{
            const data = await login({
                UserEmail: email,
                UserPassword: password,
            });

            const token = data.token;
            localStorage.setItem('token', token);
            localStorage.setItem('user', email);
            dispatch({
                type: 'LOGIN',
                payload: { userName: email, token },
            });
        }catch (error){
            console.error(error);
        }


    };

    const logoutUser = async (redirectTo) => {
        try {
            await logout(authState.token);
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.setItem('cart', JSON.stringify([]));
            dispatch({ type: 'LOGOUT' });
            navigate(redirectTo);
        }
        catch (error){
            console.error(error);
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