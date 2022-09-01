import {TUser} from "../services/types";

const config = {
    baseUrl: 'https://norma.nomoreparties.space/api',
    headers: {
        'Content-Type': 'application/json'
    }
}

type TConfig = {
    baseUrl: string,
    headers: {
        [key: string]: string
    }
}

class API {
    private _url: string;
    private _headers: {
        [key: string]: string
    };

    constructor({baseUrl, headers}: TConfig) {
        this._url = baseUrl;
        this._headers = headers;
    }

    getIngredients() {
        return fetch(`${this._url}/ingredients`)
            .then(this._checkResponse)
    };

    saveOrder(body: { ingredients: Array<string> }, token: string) {
        return fetch(`${this._url}/orders`, {
            method: "POST",
            headers: {...this._headers, authorization: `Bearer ${token}`},
            body: JSON.stringify(body)
        })
            .then(this._checkResponse)
    }

    resetPassword(email: string) {
        return fetch(`${this._url}/password-reset`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({email})
        })
            .then(this._checkResponse)
    }

    setNewPassword(password: string, token: string) {
        return fetch(`${this._url}/password-reset/reset`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({password, token})
        })
            .then(this._checkResponse)
    }

    register(email: string, password: string, name: string) {
        return fetch(`${this._url}/auth/register`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({email, password, name})
        })
            .then(this._checkResponse)
    }

    login(email: string, password: string) {
        return fetch(`${this._url}/auth/login`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({email, password})
        })
            .then(this._checkResponse)
    }

    logout(refreshToken: string) {
        return fetch(`${this._url}/auth/logout`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({token: refreshToken})
        })
            .then(this._checkResponse)
    }

    refreshToken(refreshToken: string) {
        return fetch(`${this._url}/auth/token`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({token: refreshToken})
        })
            .then(this._checkResponse)
    }

    getProfileInfo(token: string) {
        return fetch(`${this._url}/auth/user`, {
            method: "GET",
            headers: {...this._headers, authorization: `Bearer ${token}`},
        })
            .then(this._checkResponse)
    }

    setProfileInfo(token: string, profileInfo: TUser) {
        return fetch(`${this._url}/auth/user`, {
            method: "PATCH",
            headers: {...this._headers, 'authorization': `Bearer ${token}`},
            body: JSON.stringify(profileInfo)
        })
            .then(this._checkResponse)
    }

    getOrderByNumber(number: string) {
        return fetch(`${this._url}/orders/${number}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(this._checkResponse)
    };

    _checkResponse(res: Response) {
        if (res.status === 200) {
            return res.json()
        }
        return res.json().then((res) => {
            throw res.message
        })
    }
}

const api = new API(config);

export default api;
