const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        // 'Accept': 'application/json',
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

    register(email, password, name) {
        return fetch(`${this._url}/auth/register`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({email, password, name})
        })
            .then(this._checkResponse)
    }

    login(email, password) {
        return fetch(`${this._url}/auth/login`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({email, password})
        })
            .then(this._checkResponse)
    }

    logout(refreshToken) {
        return fetch(`${this._url}/auth/logout`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({token: refreshToken}) //todo проверить работоспособность, в документации стоит {"token": "{{refreshToken}}"}
        })
            .then(this._checkResponse)
    }

    refreshToken(refreshToken) {
        return fetch(`${this._url}/auth/token`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({token: refreshToken}) //todo проверить работоспособность, в документации стоит {"token": "{{refreshToken}}"}
        })
            .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.status === 200) {
            return res.json()
        }
        return res.json().then(res => {
            throw res.message
        })
    }
}

const api = new API(config);

export default api;
