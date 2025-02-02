import axios from 'axios';

const api = axios.create({
    baseURL: "$DROPBOX_TOKEN",
});

export default api;
