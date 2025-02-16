import RequestService from "../requestService.js"

// Основные категории
export const getAllCategories = async () =>
    await new RequestService('get', '/prod/categories').handleRequest();

export const getCategoryById = async (categoryId) =>
    await new RequestService('get', `/prod/categories/${categoryId}`).handleRequest();

export const createCategory = async (data, token) =>
    await new RequestService('post', '/prod/categories')
        .setFormData(data)
        .setToken(token)
        .handleRequest();

export const updateCategory = async (id, data, token) =>
    await new RequestService('put', `/prod/categoryupdate/${id}`)
        .setFormData(data)
        .setToken(token)
        .handleRequest();

export const deleteCategory = async (id, token) =>
    await new RequestService('delete', `/prod/categories/${id}`).setToken(token).handleRequest();

export const restoreCategory = async (id, token) =>
    await new RequestService('put', `/prod/categories/restore/${id}`).setFormData(token).handleRequest();

export const getDeletedCategories = async () =>
    await new RequestService('get', '/prod/categories/deleted').handleRequest();

// Подкатегории
export const getAllSubcategories = async () =>
    await new RequestService('get', `/prod/subcategories`).handleRequest();

export const getSubcategoryById = async (id) =>
    await new RequestService('get', `/prod/subcategories/${id}`).handleRequest();

export const getSubcategoriesByCategoryId = async (id) =>
    await new RequestService('get', `/prod/subcategories/category/${id}`).handleRequest();

export const createSubcategory = async (data, token) =>
    await new RequestService('post', `/prod/subcategories`).setFormData(data).setToken(token).handleRequest();

export const updateSubcategoryById = async (id, data, token) =>
    await new RequestService('put', `/prod/subcategories/${id}`).setFormData(data).setToken(token).handleRequest();

export const deleteSubcategoryById = async (id, token) =>
    await new RequestService('delete', `/prod/subcategories/${id}`).setToken(token).handleRequest();