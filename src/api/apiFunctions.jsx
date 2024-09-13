import {makeRequest} from './makeRequest';

export const signup = async (userData) => {
    return await makeRequest('post', '/auth/signup', userData);
};

export const login = async (credentials) => {
    return await makeRequest('post', '/auth/login', credentials);
};

export const getAllProducts = async () => {
    return await makeRequest('get', '/prod/allproducts');
};

export const getCategories = async () => {
    return await makeRequest('get', '/prod/categories');
};

export const getCategoryProducts = async (categoryId) => {
    return await makeRequest('get', `/prod/categoryproducts/${categoryId}`);
};

export const getProductDetails = async (productId) => {
    return makeRequest('get', `/prod/product/${productId}`);
};

export const getSaleImages = async () => {
    return await makeRequest('get', '/prod/carousel');
};

export const getCategoryName = async (categoryId) => {
    return await makeRequest('get', `/prod/categories/${categoryId}`);
};

export const logout = async(token)=>{
    return  await makeRequest('post', `/auth/logout`, null, token);
}

export const getIcons = () => {
    const data = {
        account: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFjcl26tM8ihvF27Mt0RTf-X2tnHzDAhO2Q&s',
        basket: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERVL3Yb4wldHeIS2iN3v9CBotZG5c-jPReA&s',
    }
    return data;
};

export const saveCart = async (token) => {
    try {
        return await makeRequest('post', '/cart/save', cart, token);
    } catch (error) {
        console.error('Ошибка сохранения корзины:', error);
    }
};

export const SearchProduct = (title)=>{
    return title;
}
