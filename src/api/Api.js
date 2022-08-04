const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Accept': 'application/json',
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

    resetPassword(body) {
        return fetch(`${this._url}/password-reset`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(body)
        })
            .then(this._checkResponse)
    }

    setNewPassword(password, token) {
        return fetch(`${this._url}/password-reset/reset`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({password, token})
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
