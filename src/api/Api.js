const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

class API {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;
    }

    getIngredients() {
        return fetch(`${this._url}/ingredients`)
            .then(this._checkResponse)
    };

    saveOrder(body) {
        return fetch(`${this._url}/orders`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }
}

const api = new API(config);

export default api;
