import axios from 'axios';

const api = axios.create({
    baseURL: 'https://shnurok.azurewebsites.net/api',
});

export default api;