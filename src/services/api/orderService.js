import RequestService from "../requestService.js";

export const confirmOrder = async (token, data) =>
    await new RequestService('post', '/orders/placeorder').setData(data).setToken(token).handleRequest();

export const getUserOrders = async (token) =>
    await new RequestService('get', '/orders/getorders').setToken(token).handleRequest();

export const repeatOrder = async (token, data) =>
    await new RequestService('post', '/orders/repeatorder').setData(data).setToken(token).handleRequest();