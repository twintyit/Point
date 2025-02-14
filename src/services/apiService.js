import RequestService from "./requestService.js";

export const signup = async (userData) => {
    return await new RequestService('post', '/auth/signup')
        .setData(userData)
        .handleRequest();
};

export const login = async (credentials) => {
    return await new RequestService('post', '/auth/login')
        .setData(credentials)
        .handleRequest();
};

export const getAllProducts = async () => {
    return await new RequestService('get', '/prod/allproducts')
        .handleRequest();
};

export const getAllCategories = async () => {
    return await new RequestService('get', '/prod/categories')
        .handleRequest();
};

export const getCategoryProducts = async (categoryId) => {
    return await new RequestService('get', `/prod/categoryproducts/${categoryId}`)
        .handleRequest();
};

export const getProductDetails = async (productId) => {
    return await new RequestService('get', `/prod/product/${productId}`)
        .handleRequest();
};

export const getSaleImages = async () => {
    return await new RequestService('get', '/prod/carousel')
        .handleRequest();
};

export const getCategoryById = async (categoryId) => {
    return await new RequestService('get', `/prod/categories/${categoryId}`)
        .handleRequest();
};

export const logout = async (token) => {
    return await new RequestService('post', '/auth/logout')
        .setToken(token)
        .handleRequest();
};

export const addItemToCart = async (itemId, token) => {
    return await new RequestService('post', '/orders/additemfromcart')
        .setData(itemId)
        .setToken(token)
        .handleRequest();
};

export const getCart = async (token) => {
    return await new RequestService('get', '/orders/getcart')
        .setToken(token)
        .handleRequest();
};

export const cleanCart = async (token) => {
    return await new RequestService('post', '/orders/clearcart')
        .setToken(token)
        .handleRequest();
};

export const removeItemFromCart = async (itemId, token) => {
    return await new RequestService('post', '/orders/removeitemfromcart')
        .setData(itemId)
        .setToken(token)
        .handleRequest();
};

export const deleteItemFromCart = async (itemId, token) => {
    return await new RequestService('post', '/orders/removeallitemsfromcart')
        .setData(itemId)
        .setToken(token)
        .handleRequest();
};

export const searchProduct = async (title) => {
    return await new RequestService('get', '/prod/search')
        .setQueryParams({ query: title })
        .handleRequest();
};

export const confirmOrder = async (token, data) => {
    return await new RequestService('post', '/orders/placeorder')
        .setData(data)
        .setToken(token)
        .handleRequest();
};

export const getUserAddresses = async (token) => {
    return await new RequestService('get', '/user/getaddresses')
        .setToken(token)
        .handleRequest();
};

export const getUserOrders = async (token) => {
    return await new RequestService('get', '/orders/getorders')
        .setToken(token)
        .handleRequest();
};

export const repeatOrder = async (token, data) => {
    return await new RequestService('post', '/orders/repeatorder')
        .setData(data)
        .setToken(token)
        .handleRequest();
};

export const deleteCategory = async (token, id) => {
    return await new RequestService('delete', `/prod/categories/${id}`)
        .setToken(token)
        .handleRequest();
};

export const updateCategory = async (id, data, token) => {
    return await new RequestService('put', `/prod/categoryupdate/${id}`)
        .setFormData(data)
        .setToken(token)
        .handleRequest();
};

export const getDeletedCategories = async () => {
    return await new RequestService('get', '/prod/categories/deleted')
        .handleRequest();
};

export const createCategory = async (data, token) => {
    return await new RequestService('post', '/prod/categories')
        .setFormData(data)
        .setToken(token)
        .handleRequest();
};

export const getAllSybCategories = async () => {
    return await new RequestService('get', `/prod/subcategories`)
        .handleRequest();
};

export const getSubcategoryById = async (id) => {
    return await new RequestService('get', `/prod/subcategories/${id}`)
        .handleRequest();
};

export const deleteSubcategoryById = async (id, token) => {
    return await new RequestService('delete', `/prod/subcategories/${id}`)
        .setToken(token)
        .handleRequest();
};

export const createSubcategory = async (data, token) => {
    return await new RequestService('post', `/prod/subcategories`)
        .setFormData(data)
        .setToken(token)
        .handleRequest();
};

export const updateSubcategoryById = async (id, data, token) => {
    return await new RequestService('put', `/prod/subcategories/${id}`)
        .setFormData(data)
        .setToken(token)
        .handleRequest();
};

export const getSubcategoriesByCategoryId = async (id) => {
    return await new RequestService('get', `/prod/categories/${id}/subcategories`)
        .handleRequest();
};

