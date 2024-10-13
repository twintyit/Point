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

export const addItemToCart = async (itemId, token) => {
    try {
        return await makeRequest('post', '/orders/additemfromcart', itemId, token);
    } catch (error) {
        console.error('Error saving cart:', error);
    }
};

export const getCart = async (token) => {
    return await makeRequest('get', '/orders/getcart', null, token);
};

export const cleanCart = async (token) => {
    try {
        return await makeRequest('post', '/orders/clearcart', null, token);
    } catch (error) {
        console.error('Cleaning cart errors:', error);
    }
};

export const removeItemFromCart = async(itemId, token) => {
    try {
        return await makeRequest('post', '/orders/removeitemfromcart', itemId, token);
    } catch (error) {
        console.error('Error reducing quantity:', error);
    }
};

export const deleteItemFromCart = async (itemId, token) => {
    try {
        return await makeRequest('post', '/orders/removeallitemsfromcart', itemId, token);
    } catch (error) {
        console.error('Error deleting item:', error);
    }
};

export const SearchProduct = async (title)=>{
    return await makeRequest('get', `/prod/search?query=${title}`);
}

export const confirmOrder = async (token, data) => {
    return await makeRequest('post', `/orders/placeorder`, data, token);
}

export const getUserAddresses = async (token) => {
    return await makeRequest('get', `/user/getaddresses`, token);
}

export const getUserOrders = async (token) => {
    return await makeRequest('get', `/orders/getorders`, token);
}

export const repeatOrder = async (token, data) => {
    return await makeRequest('post', '/orders/repeatorder', data, token )
}