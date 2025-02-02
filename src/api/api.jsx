import axios from 'axios';

const api = axios.create({
    baseURL: 'https://back/api',
});

export default api;
