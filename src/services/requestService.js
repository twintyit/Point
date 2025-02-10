import api from '../api/api.js';

export default class RequestService {
    constructor(method, url) {
        this.method = method;
        this.url = url;
        this.headers = { 'Content-Type': 'application/json' };
        this.params = {};
        this.data = null;
    }

    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    setToken(token) {
        this.setHeader('Authorization', `Bearer ${token}`);
        return this;
    }

    setQueryParams(params) {
        this.params = { ...this.params, ...params };
        return this;
    }

    setData(data) {
        this.data = data;
        return this;
    }

    setFormData(data) {
        this.data = data;
        console.log(data)
        delete this.headers['Content-Type'];
        return this;
    }

    async send() {
        // eslint-disable-next-line no-useless-catch
        try {
            const config = {
                headers: this.headers,
                params: this.params,
            };

            console.log(`📤 [${this.method.toUpperCase()}] ${this.url}`);
            if (this.data) console.log("📦 Данные запроса:", this.data);

            const preparedData = this.data instanceof FormData ? this.data : JSON.stringify(this.data);

            const response =
                this.method === "get"
                    ? await api.get(this.url, config)
                    : await api[this.method](this.url, preparedData, config);

            console.log(response)

            return response.data;
        } catch (error) {
            throw error; // просто выбрасываем ошибку для дальнейшей обработки
        }
    }

    async handleRequest() {
        try {
            const data = await this.send();  // просто вызываем send, который возвращает данные или выбрасывает ошибку

            console.log(`✅ Ответ от ${this.url}`, data);
            return data;
        } catch (error) {
            if (error.response) {
                const {status, data} = error.response;

                console.error(
                    `❌ Ошибка при запросе [${this.method.toUpperCase()}] ${this.url} - ${status}\n📄 Ответ сервера:`,
                    data
                );

                // Обработка ошибок по статусам
                switch (status) {
                    case 400:
                        console.warn("⚠️ Ошибка в запросе (400):", data.message);
                        break;
                    case 401:
                        console.warn("🔒 Не авторизован (401) – требуется вход!");
                        break;
                    case 403:
                        console.warn("🚫 Доступ запрещен (403)!");
                        break;
                    case 404:
                        console.warn("🔍 Не найдено (404):", this.url);
                        break;
                    case 500:
                        console.warn("🔥 Ошибка сервера (500)!");
                        break;
                    default:
                        console.warn(`⚠️ Неизвестная ошибка (${status})`, data);
                }
            } else if (error.request) {
                console.error(`⚠️ Сервер не ответил на запрос [${this.method.toUpperCase()}] ${this.url}`);
            } else {
                console.error(`🔥 Ошибка запроса: ${error.message}`);
            }

            throw error; // повторно выбрасываем ошибку, чтобы можно было дальше обработать
        }
    }
}