import RequestService from "../requestService.js";

export const getCart = async (token) =>
    await new RequestService('get', '/orders/getcart').setToken(token).handleRequest();

export const addItemToCart = async (itemId, token) =>
    await new RequestService('post', '/orders/additemfromcart').setData(itemId).setToken(token).handleRequest();

export const removeItemFromCart = async (itemId, token) =>
    await new RequestService('post', '/orders/removeitemfromcart').setData(itemId).setToken(token).handleRequest();

export const deleteItemFromCart = async (itemId, token) =>
    await new RequestService('post', '/orders/removeallitemsfromcart').setData(itemId).setToken(token).handleRequest();

export const cleanCart = async (token) =>
    await new RequestService('post', '/orders/clearcart').setToken(token).handleRequest();