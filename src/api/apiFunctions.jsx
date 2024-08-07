import api from './api';

const handleErrors = (errorCode) => {
    switch (errorCode) {
        case 0:
            return 'Success';
        case 1:
            return 'Password error';
        case 2:
            return 'Email error';
        case 3:
            return 'Email already registered';
        default:
            return 'Unknown error';
    }
};

export const signup = async (userData) => {
    try {
        console.log(userData);
        const response = await api.post('/auth/signup', userData);
        console.log(response);
        if (response.data.status.code !== 0) {
            throw new Error(handleErrors(response.data.errorCode));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        if (response.data.status.code !== 0) {
            throw new Error(handleErrors(response.data.errorCode));
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};