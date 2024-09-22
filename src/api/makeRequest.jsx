import api from './api'; 

const handleErrors = (errorCode) => {
    switch (errorCode) {
        case 0:
            return 'Success';
        case 1:
            return 'Password error';
        case 2:
            return 'Email error';
        case 3:
            return 'Email already registered';
        default:
            return 'Unknown error';
    }
};


export const makeRequest = async (method, url, data = null, token = null) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json', 
            },
        };

        if (token) {
            config.headers['Authorization'] = token;
        }

        const response = method === 'get'
            ? await api[method](url, config)
            : await api[method](url, data, config);

        if (response.data.status && response.data.status.code !== 0) {
            throw new Error(handleErrors(response.data.errorCode));
        }
        return response.data;
    } catch (error) {
        console.error(`Ошибка при выполнении запроса к ${url}:`, error);
        throw error;
    }
};