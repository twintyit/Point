import RequestService from "../requestService.js";

export const getAllBrands = async () =>
    await new RequestService('get', '/prod/brands')
        .handleRequest();

export const getDeletedBrands = async () =>
    await new RequestService('get', '/prod/brands/deleted')
        .handleRequest();

export const getBrandById = async (id) =>
    await new RequestService('get', `/prod/brands/${id}`)
        .handleRequest();

export const createBrand = async (data, token) =>
    await new RequestService('post', `/prod/brands`)
        .setFormData(data)
        .setToken(token)
        .handleRequest();

export const updateBrand = async (id, data, token) =>
    await new RequestService('put', `/prod/brands/${id}`)
        .setToken(token)
        .setFormData(data)
        .handleRequest();

export const deleteBrand = async (id, token) =>
    await new RequestService('delete', `/prod/brands/${id}`)
        .setToken(token)
        .handleRequest();

export const restoreBrand = async (id, token) =>
    await new RequestService('put', `/prod/brands/restore/${id}`)
        .setToken(token)
        .handleRequest();