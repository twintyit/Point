import axios from 'axios';

const api = axios.create({
    baseURL: 'https://point.in.ua/api',
});

export default api;
