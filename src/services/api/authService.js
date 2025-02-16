import RequestService from "../requestService.js";

export const signup = async (userData) =>
    await new RequestService('post', '/auth/signup').setData(userData).handleRequest();

export const login = async (credentials) =>
    await new RequestService('post', '/auth/login').setData(credentials).handleRequest();

export const logout = async (token) =>
    await new RequestService('post', '/auth/logout').setToken(token).handleRequest();