import {makeRequest} from './makeRequest';
import RequestBuilder from "./requestBuilder.js";

export const signup = async (userData) => {
    return await new RequestBuilder('post', '/auth/signup')
        .setData(userData)
        .send();
};

export const login = async (credentials) => {
    return await new RequestBuilder('post', '/auth/login')
        .setData(credentials)
        .send();
};

export const getAllProducts = async () => {
    return await new RequestBuilder('get', '/prod/allproducts').send();
};

export const getCategories = async () => {
    return await new RequestBuilder('get', '/prod/categories').send();
};

export const getCategoryProducts = async (categoryId) => {
    return await new RequestBuilder('get', `/prod/categoryproducts/${categoryId}`).send();
};

export const getProductDetails = async (productId) => {
    return await new RequestBuilder('get', `/prod/product/${productId}`).send();
};

export const getSaleImages = async () => {
    return await new RequestBuilder('get', '/prod/carousel').send();
};

export const getCategoryName = async (categoryId) => {
    return await new RequestBuilder('get', `/prod/categories/${categoryId}`).send();
};

export const logout = async (token) => {
    return await new RequestBuilder('post', '/auth/logout').setToken(token).send();
};

export const getIcons = () => {
    return {
        account: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFjcl26tM8ihvF27Mt0RTf-X2tnHzDAhO2Q&s',
        basket: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERVL3Yb4wldHeIS2iN3v9CBotZG5c-jPReA&s',
    };
};

export const addItemToCart = async (itemId, token) => {
    return await new RequestBuilder('post', '/orders/additemfromcart')
        .setData(itemId)
        .setToken(token)
        .send();
};

export const getCart = async (token) => {
    return await new RequestBuilder('get', '/orders/getcart').setToken(token).send();
};

export const cleanCart = async (token) => {
    return await new RequestBuilder('post', '/orders/clearcart').setToken(token).send();
};

export const removeItemFromCart = async (itemId, token) => {
    return await new RequestBuilder('post', '/orders/removeitemfromcart')
        .setData(itemId)
        .setToken(token)
        .send();
};

export const deleteItemFromCart = async (itemId, token) => {
    return await new RequestBuilder('post', '/orders/removeallitemsfromcart')
        .setData(itemId)
        .setToken(token)
        .send();
};

export const searchProduct = async (title) => {
    return await new RequestBuilder('get', '/prod/search').setQueryParams({ query: title }).send();
};

export const confirmOrder = async (token, data) => {
    return await new RequestBuilder('post', '/orders/placeorder').setData(data).setToken(token).send();
};

export const getUserAddresses = async (token) => {
    return await new RequestBuilder('get', '/user/getaddresses').setToken(token).send();
};

export const getUserOrders = async (token) => {
    return await new RequestBuilder('get', '/orders/getorders').setToken(token).send();
};

export const repeatOrder = async (token, data) => {
    return await new RequestBuilder('post', '/orders/repeatorder').setData(data).setToken(token).send();
};

export const deleteCategory = async (token, id) => {
    return await new RequestBuilder('post', '/prod/deletecategory').setData({ id }).setToken(token).send();
};

export const editCategory = async (data, token) => {
    return await new RequestBuilder('post', '/prod/updatecategory')
        .setFormData(data) // Устанавливаем данные без преобразования в JSON
        .setToken(token) // Добавляем токен авторизации
        .send();
};

export const addCategory = async (data) => {
    return await new RequestBuilder('post', '/prod/createcategory')
        .setData(data)
        .send();
};


// export const signup = async (userData) => {
//     return await makeRequest('post', '/auth/signup', userData);
// };
//
// export const login = async (credentials) => {
//     return await makeRequest('post', '/auth/login', credentials);
// };
//
// export const getAllProducts = async () => {
//     return await makeRequest('get', '/prod/allproducts');
// };
//
// export const getCategories = async () => {
//     return await makeRequest('get', '/prod/categories');
// };
//
// export const getCategoryProducts = async (categoryId) => {
//     return await makeRequest('get', `/prod/categoryproducts/${categoryId}`);
// };
//
// export const getProductDetails = async (productId) => {
//     return makeRequest('get', `/prod/product/${productId}`);
// };
//
// export const getSaleImages = async () => {
//     return await makeRequest('get', '/prod/carousel');
// };
//
// export const getCategoryName = async (categoryId) => {
//     return await makeRequest('get', `/prod/categories/${categoryId}`);
// };
//
// export const logout = async(token)=>{
//     return  await makeRequest('post', `/auth/logout`, null, token);
// }
//
// export const getIcons = () => {
//     const data = {
//         account: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFjcl26tM8ihvF27Mt0RTf-X2tnHzDAhO2Q&s',
//         basket: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTERVL3Yb4wldHeIS2iN3v9CBotZG5c-jPReA&s',
//     }
//     return data;
// };
//
// export const addItemToCart = async (itemId, token) => {
//     try {
//         return await makeRequest('post', '/orders/additemfromcart', itemId, token);
//     } catch (error) {
//         console.error('Error saving cart:', error);
//     }
// };
//
// export const getCart = async (token) => {
//     return await makeRequest('get', '/orders/getcart', null, token);
// };
//
// export const cleanCart = async (token) => {
//     try {
//         return await makeRequest('post', '/orders/clearcart', null, token);
//     } catch (error) {
//         console.error('Cleaning cart errors:', error);
//     }
// };
//
// export const removeItemFromCart = async(itemId, token) => {
//     try {
//         return await makeRequest('post', '/orders/removeitemfromcart', itemId, token);
//     } catch (error) {
//         console.error('Error reducing quantity:', error);
//     }
// };
//
// export const deleteItemFromCart = async (itemId, token) => {
//     try {
//         return await makeRequest('post', '/orders/removeallitemsfromcart', itemId, token);
//     } catch (error) {
//         console.error('Error deleting item:', error);
//     }
// };
//
// export const SearchProduct = async (title)=>{
//     return await makeRequest('get', `/prod/search?query=${title}`);
// }
//
// export const confirmOrder = async (token, data) => {
//     return await makeRequest('post', `/orders/placeorder`, data, token);
// }
//
// export const getUserAddresses = async (token) => {
//     return await makeRequest('get', `/user/getaddresses`, token);
// }
//
// export const getUserOrders = async (token) => {
//     return await makeRequest('get', `/orders/getorders`, token);
// }
//
// export const repeatOrder = async (token, data) => {
//     return await makeRequest('post', '/orders/repeatorder', data, token )
// }
//
// export const deleteCategory = async (token, id) => {
//     return await makeRequest('post', '/prod/deletecategory', id, token )
// }
//
// export const editCategory = async (data, token) => {
//     return await makeRequest('post', '/prod/updatecategory', data, token )
// }