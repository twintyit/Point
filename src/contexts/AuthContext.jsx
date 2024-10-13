import React, { createContext, useContext, useState, useEffect } from 'react';
import { login, logout } from '../api/apiFunctions';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(()=>{
        if (localStorage.getItem('token')){
            return true
        }
        return false;  
    });

    const [userName, setUserName] = useState(()=>{
       const userName=  localStorage.getItem('userName');
        if (userName){
            return userName
        }
        return "false";
    });
    const navigate = useNavigate(); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const loginUser = async (email, password) => {
        const response = await login({
            UserEmail: email,
            UserPassword: password,
        });
        if (response.status.code === 0){
            localStorage.setItem('token', response.data);
            localStorage.setItem('userName', email);
            setUserName(email);
            setIsAuthenticated(true);
        }
    };

    const logoutUser = async (redirectTo) => {
        const token = localStorage.getItem('token');
        const res = await logout(token);

        if (res.status.code === 0) {
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate(redirectTo);
        }
    };

    const getToken = () =>{
        return localStorage.getItem('token');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userName, loginUser, logoutUser, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};
