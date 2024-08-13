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
        const response = await api.post('/auth/signup', userData);
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

export const getAllProducts = async () => {
    try {
        const response = await api.get('/prod/allproducts');
        if (response.data.status.code !== 0) {
            throw new Error(handleErrors(response.data.errorCode));
        }
        return  response.data;
    } catch (error) {
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const response = await api.get('/prod/categories');
        if (response.data.status.code !== 0) {
            throw new Error(handleErrors(response.data.errorCode));
        }
        return  response.data;
    } catch (error) {
        throw error;
    }
};
export const getCategoryProducts = async (categoryId) => {
    try {
        const response = await api.get(`/prod/categoryproducts/${categoryId}`);

        if (response.data.status.code !== 0) {
            throw new Error(handleErrors(response.data.errorCode));
        }
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении товаров категории ${categoryId}:`, error);
    }
}

export const getProductDetails= async ()=>{
    return "rrrr"
}

export const getSaleImages = async () => {

    try {
        const response = await api.get(`/prod/carousel`);
        console.log(response);
        
        if (response.data.status.code !== 0) {
            throw new Error(handleErrors(response.data.errorCode));
        }
        return  response.data;
    } catch (error) {
        console.error( error);
    }
}