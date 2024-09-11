import {makeRequest} from './makeRequest';

export const signup = async (userData) => {
    return makeRequest('post', '/auth/signup', userData);
};

export const login = async (credentials) => {
    return makeRequest('post', '/auth/login', credentials);
};

export const getAllProducts = async () => {
    return makeRequest('get', '/prod/allproducts');
};

export const getCategories = async () => {
    return makeRequest('get', '/prod/categories');
};

export const getCategoryProducts = async (categoryId) => {
    return makeRequest('get', `/prod/categoryproducts/${categoryId}`);
};

export const getProductDetails = async (productId) => {
    return makeRequest('get', `/prod/product/${productId}`);
};

export const getSaleImages = async () => {
    return makeRequest('get', '/prod/carousel');
};

export const getCategoryName = async (categoryId) => {
    return makeRequest('get', `/prod/categories/${categoryId}`);
};

export const logout = async(token)=>{
    return makeRequest('post', `/auth/logout`, null, token);
}

export const getIcons = () => {
    const data = {
        account: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFjcl26tM8ihvF27Mt0RTf-X2tnHzDAhO2Q&s',
        basket: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERVL3Yb4wldHeIS2iN3v9CBotZG5c-jPReA&s',
    }
    return data;
};

export const SearchProduct = (title)=>{
    return title;
}
