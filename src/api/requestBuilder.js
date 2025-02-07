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

export default class RequestBuilder {
    constructor(method, url) {
        this.method = method; // HTTP метод (GET, POST и т.д.)
        this.url = url; // URL-адрес
        this.headers = { 'Content-Type': 'application/json' }; // Заголовки с JSON по умолчанию
        this.params = {}; // Параметры запроса (query)
        this.data = null; // Тело запроса
    }

    setHeader(key, value) {
        this.headers[key] = value; // Добавить/переопределить заголовок
        return this; // Для цепочки вызовов
    }

    setToken(token) {
        this.setHeader('Authorization', `Bearer ${token}`);
        return this;
    }

    setQueryParams(params) {
        this.params = { ...this.params, ...params }; // Добавить или обновить параметры
        return this;
    }

    setData(data) {
        this.data = data; // Установить тело запроса
        return this;
    }

    setFormData(data) {
        this.data = data; // Установить FormData
        this.setHeader('Content-Type', 'multipart/form-data');
        return this;
    }

    async send() {
        try {
            const config = {
                headers: this.headers,
                params: this.params,
            };

            // Убедимся, что данные преобразованы в JSON, если это требуется
            const preparedData =
                this.headers['Content-Type'] === 'application/json' && this.data
                    ? JSON.stringify(this.data)
                    : this.data;

            const response =
                this.method === 'get'
                    ? await api.get(this.url, config)
                    : await api[this.method](this.url, preparedData, config);

            console.log(response);
            if (response.data.status > 200 && response.data.status < 300) {
                throw new Error(`Ошибка: ${handleErrors(response.data.status)}`);
            }

            return response.data;
        } catch (error) {
            throw new Error(`Request to ${this.url} failed: ${error.message}`);
        }
    }
}