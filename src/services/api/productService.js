import RequestService from "../requestService.js";

export const getAllProducts = async () =>
    await new RequestService('get', '/prod/allproducts').handleRequest();

export const getProductDetails = async (productId) =>
    await new RequestService('get', `/prod/product/${productId}`).handleRequest();

export const searchProduct = async (title) =>
    await new RequestService('get', '/prod/search').setQueryParams({ query: title }).handleRequest();

export const getSaleImages = async () =>
    await new RequestService('get', '/prod/carousel').handleRequest();