import RequestService from "../requestService.js";

export const getUserAddresses = async (token) =>
    await new RequestService('get', '/user/getaddresses').setToken(token).handleRequest();